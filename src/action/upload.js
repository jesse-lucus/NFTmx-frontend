import Arweave from 'arweave';
import { useWallet } from 'solana-wallets-vue';
import { Buffer } from 'buffer';
import sendLamport from './transaction';
import { calculate } from '@metaplex/arweave-cost';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  PublicKey,
} from '@solana/web3.js';
import FormData from 'form-data';
import axios from 'axios';

const ARWEAVE_UPLOAD_ENDPOINT =
  'https://us-central1-metaplex-studios.cloudfunctions.net/uploadFile';


const AR_SOL_HOLDER_ID = new PublicKey(
  '6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS',
);

async function uploadArweave(data) {
  console.log(data);
  return await (
    await fetch(ARWEAVE_UPLOAD_ENDPOINT, {
      method: 'POST',
      // @ts-ignore
      body: data,
    })
  ).json();
}

async function fetchAssetCostToStore(fileSizes) {
  const result = await calculate(fileSizes);
  console.log('Arweave cost estimates:', result);

  return BigInt(parseInt(LAMPORTS_PER_SOL * result.solana * 1000));;
}

function estimateManifestSize(ext, filenames) {
  const paths = {};

  for (const name of filenames) {
    paths[name] = {
      id: 'artestaC_testsEaEmAGFtestEGtestmMGmgMGAV438',
      ext: ext.replace('.', ''),
    };
  }

  const manifest = {
    manifest: 'arweave/paths',
    version: '0.1.0',
    paths,
    index: {
      path: 'metadata.json',
    },
  };

  const data = Buffer.from(JSON.stringify(manifest), 'utf8');
  console.log('Estimated manifest size:', data.length);
  return data.length;
}

export default async function upload(
    name,
    symbol,
    ext,
    image,
  ) {
    const { publicKey } = useWallet();
    const manifeststr = {
      "name": name,
      "symbol":symbol,
      "image": name + ext,
      "seller_fee_basis_points": 0,
      "properties":{
        "files":[
          {"uri":name + ext, "type":"image/" + ext}
        ],
      "category":"image",
      "creators":[{"address": publicKey.value.toBase58(), "share": 100}]}
    };

    const manifest = manifeststr;
    const manifestBuffer = Buffer.from(JSON.stringify(manifest));

    console.log("Create Collection");

    const imagedata = await axios.get(image, { responseType: 'blob' });
    const file = new File([JSON.stringify(imagedata)], 'image.png');

    const estimatedManifestSize = estimateManifestSize(ext, [
      name + ext,
      'metadata.json',
    ]);

    const storageCost = await fetchAssetCostToStore([
      file.size,
      manifestBuffer.length,
      estimatedManifestSize,
    ]);

    console.log(imagedata);
    
    let signature = await sendLamport(AR_SOL_HOLDER_ID, storageCost);
    console.log(`solana transaction for arweave payment:`, signature);
 
    const data = new FormData();
    data.append('transaction', signature);
    data.append('file[]', imagedata.data
    , name + ext);

    const metadata = new File([JSON.stringify(manifest)], 'metadata.json');
    data.append('file[]', metadata, 'metadata.json');

    const result = await uploadArweave(data);
    console.log("upload", result);

    const metadataFile = result.messages?.find(
      m => m.filename === 'manifest.json',
    );
    const imageFile = result.messages?.find(
      m => m.filename === name + ext,
    );
    if (metadataFile?.transactionId) {
      const link = `https://arweave.net/${metadataFile.transactionId}`;
      const imageLink = `https://arweave.net/${
        imageFile.transactionId
      }?ext=`+ ext;
      // console.log(`File uploaded: ${link}`, imageLink);
      return [link, imageLink];
    } else {
      // @todo improve
      throw new Error(`No transaction ID for uploading`);
    }
  }