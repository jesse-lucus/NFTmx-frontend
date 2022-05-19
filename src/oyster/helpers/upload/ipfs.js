import log from 'loglevel';
import fetch from 'node-fetch';
import { create, globSource } from 'ipfs-http-client';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function ipfsUpload(
  ipfsCredentials,
  image,
  manifestBuffer,
) {
  const tokenIfps = `${ipfsCredentials.projectId}:${ipfsCredentials.secretKey}`;
  // @ts-ignore
  const ipfs = create('https://ipfs.infura.io:5001');

  const uploadToIpfs = async source => {
    const { cid } = await ipfs.add(source).catch();
    return cid;
  };

  const mediaHash = await uploadToIpfs(globSource(image, { recursive: true }));
  log.debug('mediaHash:', mediaHash);
  const mediaUrl = `https://ipfs.io/ipfs/${mediaHash}`;
  log.debug('mediaUrl:', mediaUrl);
  const authIFPS = Buffer.from(tokenIfps).toString('base64');
  await fetch(`https://ipfs.infura.io:5001/api/v0/pin/add?arg=${mediaHash}`, {
    headers: {
      Authorization: `Basic ${authIFPS}`,
    },
    method: 'POST',
  });
  log.info('uploaded image for file:', image);

  await sleep(500);

  const manifestJson = JSON.parse(manifestBuffer.toString('utf8'));
  manifestJson.image = mediaUrl;
  manifestJson.properties.files = manifestJson.properties.files.map(f => {
    return { ...f, uri: mediaUrl };
  });

  const manifestHash = await uploadToIpfs(
    Buffer.from(JSON.stringify(manifestJson)),
  );
  await fetch(
    `https://ipfs.infura.io:5001/api/v0/pin/add?arg=${manifestHash}`,
    {
      headers: {
        Authorization: `Basic ${authIFPS}`,
      },
      method: 'POST',
    },
  );

  await sleep(500);
  const link = `https://ipfs.io/ipfs/${manifestHash}`;
  log.info('uploaded manifest: ', link);

  return [link, mediaUrl];
}
