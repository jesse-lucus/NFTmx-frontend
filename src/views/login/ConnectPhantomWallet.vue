<script setup>
import { useRouter } from 'vue-router';
import { useStore} from 'vuex';
import { watchEffect } from 'vue';
import { WalletMultiButton } from 'solana-wallets-vue'
import { useWallet } from 'solana-wallets-vue';
import NftmxButton from '@/core/components/basic/NftmxButton.vue';
import { useToast } from "vue-toastification";
import { mainChain } from '@/core/config'


defineProps({
    wallet: {
        type: Object,
        required: true
    }
});

const store = useStore();
const toast = useToast();
const router = useRouter();

const { publicKey } = useWallet();

watchEffect(() => {
  if (publicKey.value) connect();
});


const connect = async () => {
    if (typeof window.solana !== 'undefined') {
        console.log(publicKey);
        if(publicKey.value){
            store.dispatch("auth/login", publicKey.value.toBase58()).then(res => {
                if (router.currentRoute.value.path === '/login') {
                    router.push('/profilesolana');
                }
            });
        }
        // else{
        //     window.solana.connect().then(element => {
        //         const wallet = element.publicKey.toBase58().toString();

        //     }).catch(err=> {console.log(err)});
        // }
    }
}

const handleLogin = (accounts) => {
    if (accounts.length === 0) {
        toast.error('Please connect to MetaMask')
    }
}

</script>

<template>
    <div class="flex flex-col text-center justify-center items-center">
        <div class="w-fit font-press text-sm sm:pt-4 sm:pb-6">
            <img :src="wallet.imgUrl" alt class />
            <wallet-multi-button dark></wallet-multi-button>
            <!-- <nftmx-button
                color="primary"
                label= "CONNECT YOUR SOLANA WALLET"
                class="font-press w-full text-sm h-13.5"
                @click="connect()"
            /> -->
        </div>
        <!-- <div class="text-white text-sm py-1.25">Use a different wallet</div> -->
    </div>
</template>
