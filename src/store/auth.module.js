import abiJSON from '@/core/config/abi';
import { marketAddress } from "@/core/config";
import authService from "@/core/services/auth.service";

export const auth = {
    namespaced: true,
    state: {
        isLoggedIn: false,
        walletType: 0
    },
    actions: {
        async login({ commit, dispatch, rootState }, walletAddress) {
            if (walletAddress) {
                const user = {
                    walletAddress: walletAddress,
                }
                commit('loginSuccess', user);
                rootState.user = user;
                // walletAddress = walletAddress.toLowerCase();
                // rootState.marketContract = new rootState.web3.eth.Contract(
                //     abiJSON,
                //     rootState.web3.utils.toChecksumAddress(marketAddress),
                //     {
                //         from: walletAddress,
                //     }
                // );
                // return authService.connectWallet(walletAddress).then(
                //     user => {
                //         rootState.user = user;
                //         commit('loginSuccess', user);

                //         return user;
                //     },
                //     error => {
                //         commit('loginFailure');
                //         rootState.user = null;
                //         return error;
                //     }
                // )
            } else {
                rootState.user = {};
                commit('loginFailure');
                return false;
            }
        },
        // saveProfile({ commit, rootState }, data) {
        //     authService.saveProfile(rootState.user.id, data).then(res => {
        //         rootState.user = res;
        //     });
        // },
    },
    getters: {
        walletAddress: (state, getters, rootState) => {
            return rootState.user && rootState.user.walletAddress ? rootState.user.walletAddress : ''
        },
        userId: (state, getters, rootState) => {
            return rootState.user && rootState.user.id ? rootState.user.id : ''
        },
        user: (state, getters, rootState) => {
            return rootState.user
        },
    },
    mutations: {
        async loginSuccess() {
            localStorage.setItem('isLoggedIn', true);
        },
        loginFailure() {
            localStorage.removeItem('isLoggedIn');
        },
        async setWalletType(type) {
            localStorage.setItem('walletType', type);
        }
    }
}
