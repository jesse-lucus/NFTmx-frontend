import { useWallet } from 'solana-wallets-vue';
import { Connection, clusterApiUrl, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { Signer } from 'crypto';

export const DEFAULT_TIMEOUT = 15000;

export default async function sendLamport( to, lamport){
    const connection = new Connection(clusterApiUrl('devnet'));
    const { publicKey, sendTransaction } = useWallet();
    console.log(publicKey);
    if (!publicKey.value) return;
  
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey.value,
        toPubkey: to,
        lamports: lamport,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    let result = await connection.confirmTransaction(signature, 'processed');

    console.log(signature);
    return signature;
  };