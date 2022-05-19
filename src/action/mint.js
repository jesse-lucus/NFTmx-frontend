import * as anchor from '@project-serum/anchor';
import { MintLayout, Token } from '@solana/spl-token';
import * as BufferLayout from '@solana/buffer-layout';
import {
  SystemProgram,
  PublicKey,
} from '@solana/web3.js';
import { useWallet } from 'solana-wallets-vue';
import {createMetadataInstruction, createMasterEditionInstruction} from "./instructions";
import {getMasterEdition} from "./accounts";
import { Transaction, Connection, clusterApiUrl, Struct } from '@solana/web3.js';
import {
  CANDY_MACHINE,
  CANDY_MACHINE_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  FAIR_LAUNCH_PROGRAM_ID,
  AUCTION_HOUSE_PROGRAM_ID,
  AUCTION_HOUSE,
  FEE_PAYER,
  TREASURY,
  WRAPPED_SOL_MINT,
  TOKEN_ENTANGLEMENT_PROGRAM_ID,
  TOKEN_ENTANGLER,
  ESCROW,
  B,
  A,
  CANDY_MACHINE_PROGRAM_V2_ID,
} from './constants';
import * as borsh from "borsh";
import {METADATA_SCHEMA, Metadata, DataV2, Data, Creator, Collection, CreateMetadataV2Args, CreateMetadataArgs, CreateMasterEditionV3Args} from "./schema";

const getTokenWallet = async function (
  wallet,
  mint,
) {
  return (
    await PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0];
};

const createAssociatedTokenAccountInstruction = (
  associatedTokenAddress,
  payer,
  walletAddress,
  splTokenMintAddress,
) => {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
    { pubkey: walletAddress, isSigner: false, isWritable: false },
    { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new anchor.web3.TransactionInstruction({
    keys,
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([]),
  });
};

const getMetadata = async (
  mint
) => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

export const createMetadata = async (
  metadataLink,
  collection,
  uses,
) => {
  // Metadata
  let metadata;
  try {
    metadata = await (await fetch(metadataLink, { method: 'GET' })).json();
  } catch (e) {
    console.log(e);
    console.log('Invalid metadata at', metadataLink);
    return;
  }

  // Validate metadata
  if (
    !metadata.name ||
    !metadata.image ||
    isNaN(metadata.seller_fee_basis_points) ||
    !metadata.properties ||
    !Array.isArray(metadata.properties.creators)
  ) {
    console.log('Invalid metadata file', metadata);
    return;
  }

  // Validate creators
  const metaCreators = metadata.properties.creators;
  console.log("metaCreators", metaCreators);
  if (
    metaCreators.some(creator => !creator.address) ||
    metaCreators.reduce((sum, creator) => creator.share + sum, 0) !== 100
  ) {
    return;
  }

  const creators = metaCreators.map(
    creator =>
      new Creator({
        address: creator.address,
        share: creator.share,
        verified: 1,
      }),
  );

  const data = new Data({
    symbol: metadata.symbol,
    name: metadata.name,
    uri: metadataLink,
    sellerFeeBasisPoints: metadata.seller_fee_basis_points,
    creators: creators,
    // collection: collection
    //   ? new Collection({ key: collection.toBase58(), verified: 0 })
    //   : null,
    // uses,
  })
  return data;
};

export default async function  mintNFT (
  metadataLink,
  mutableMetadata = true,
  collection = null,
  use = null,
)  {
  const connection = new Connection(clusterApiUrl('devnet'));
  const { publicKey, sendTransaction } = useWallet();
  // const publicKey.value = new PublicKey(publicKey.value.toBase58());
  // Retrieve metadata
  const data = await createMetadata(metadataLink, collection, use);
  if (!data) return;


  // Create publicKey.value from keypair
  if (!publicKey) return;

  // Allocate memory for the account
  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span,
  );

  // Generate a mint
  const mint = anchor.web3.Keypair.generate();  
  const metadataAccount = await getMetadata(mint.publicKey);
  const transaction = new Transaction();
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: publicKey.value,
      newAccountPubkey: mint.publicKey,
      lamports: mintRent,
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
  );

  console.log("createAccount");

  transaction.add(
    Token.createInitMintInstruction(
      TOKEN_PROGRAM_ID,
      mint.publicKey,
      0,
      publicKey.value,
      publicKey.value,
    ),
  );

  console.log("createInitMintInstruction");

  const userTokenAccoutAddress = await getTokenWallet(
    publicKey.value,
    mint.publicKey,
  );

  transaction.add(
    createAssociatedTokenAccountInstruction(
      userTokenAccoutAddress,
      publicKey.value,
      publicKey.value,
      mint.publicKey,
    ),
  );
  console.log("createAssociatedTokenAccountInstruction");

  const createMeatadata = new CreateMetadataArgs(
    {
      instruction: 0,
      data: data,
      isMutable: false
    }
  );
  const txnData = Buffer.from(borsh.serialize(METADATA_SCHEMA, createMeatadata));
  console.log(txnData);

  transaction.add(
    createMetadataInstruction(
      metadataAccount,
      mint.publicKey,
      publicKey.value,
      publicKey.value,
      publicKey.value,
      txnData,
    ),
  );
  console.log("createMetadataInstruction");

  transaction.add(
    Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      mint.publicKey,
      userTokenAccoutAddress,
      publicKey.value,
      [],
      1,
    ),
  );

  console.log("createMintToInstruction");


  // Create master edition
  const editionAccount = await getMasterEdition(mint.publicKey);
  console.log("editionAccount", editionAccount);

  // const temp = new CreateMasterEditionV3Args({instruction: 0, maxSupply: new anchor.BN(0)})
  // const txnData = Buffer.from(borsh.serialize(METADATA_SCHEMA, temp));
  // transaction.add(
  //   createMasterEditionInstruction(
  //     metadataAccount,
  //     editionAccount,
  //     mint.publicKey,
  //     publicKey.value,
  //     publicKey.value,
  //     publicKey.value,
  //     txnData,
  //   ),
  // );
  console.log("createMasterEditionInstruction");

  let recentBlockhash = await connection.getLatestBlockhash();
  console.log("recentBlocakhash",recentBlockhash);

  transaction.recentBlockhash = recentBlockhash.blockhash;
  transaction.feePayer = publicKey.value;

  const signers = [mint];
  const signature = await sendTransaction(transaction, connection, { signers: signers});
  let result = await connection.confirmTransaction(signature, 'processed');
  console.log("result", result);


  try {
    await connection.confirmTransaction(res, 'max');
  } catch {
    // ignore
    console.log("Error");
  }

  // // Force wait for max confirmations
  // await connection.getParsedConfirmedTransaction(res, 'confirmed');
  // console.log('NFT created', res.txid);
  // console.log('\n\nNFT: Mint Address is ', mint.publicKey.toBase58());
  // // return metadataAccount;
};