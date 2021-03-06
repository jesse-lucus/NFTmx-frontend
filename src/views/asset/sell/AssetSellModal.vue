<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { saleType } from '@/core/config'
import NftmxModal from '@/core/components/modal/NftmxModal.vue';
import { useRoute, useRouter } from 'vue-router';
import DetailButton from '@/core/components/basic/DetailTab.vue';
import NftmxButton from '@/core/components/basic/NftmxButton.vue';
import NftmxSelectNetwork from '@/core/components/basic/NftmxSelectNetwork.vue';
import { useStore } from 'vuex';
import { keyCodeNumberRange } from '@/core/utils';
import NftmxToggle from '@/core/components/basic/NftmxToggle.vue';
import NftmxHashtag from '@/core/components/basic/NftmxHashtag.vue';
import NftmxDivider from '@/core/components/basic/NftmxDivider.vue';
import marketService from '@/core/services/market.service';
import { useToast } from "vue-toastification";
import Network from './Network.vue';
import Collection from './Collection.vue';
import { $vfm } from 'vue-final-modal'

const props = defineProps({
    asset: {
        type: Object,
        default: {}
    }
})

const store = useStore();
const route = useRoute();
const router = useRouter();
const tokenAddress = route.params.tokenAddress;
const tokenId = route.params.tokenId;
const nftPrice = ref();
const downsidePeriod = ref();
const downsideRate = ref();
const sale = ref(saleType.FIX_SALE);
const openCalendar = ref(false);
const moreOption = ref(false);
const bundleValue = ref(true);
const reverseValue = ref(false);
const hashtagValue = ref();
const hashtagOptions = ref([]);
const toast = useToast();
const disabled = ref(false);

const period = computed(() => downsidePeriod.value ? parseInt((downsidePeriod.value.end - downsidePeriod.value.start) / 1000) : 0);

marketService.getHashtagNames().then(res => {
    hashtagOptions.value = res.data.map(item => {
        return {
            value: item.name,
            label: item.name
        }
    });
})

const createOrder = async () => {
    const token_id = parseInt(tokenId);
    const price = nftPrice.value;
    const rate = downsideRate.value * 100;
    if (!price || !rate || !period.value) {
        toast.error('Please fill out the fields');
        return;
    };

    disabled.value = true;
    createHashTags();

    store.state.marketContract.methods.createOrder(
        tokenAddress,
        token_id,
        store.state.web3.utils.toWei(price, 'ether'),
        rate,
        period.value,
        false,
        period.value
    ).send({ from: store.getters['auth/walletAddress'] })
        .then(res => {
            router.push('/profile');
        }).catch(err => {
            console.log('err ', err);
            disabled.value = false
        });
}

const createHashTags = () => {
    if (hashtagValue.value) {
        marketService.createHashTags(hashtagValue.value, tokenAddress, tokenId, props.asset.name);
    }
}

const deselectHashtag = (value) => {
    hashtagValue.value = hashtagValue.value.filter(name => name !== value);
}

const handleCalendar = () => {
    openCalendar.value = !openCalendar.value;
}

const preventKey = (event) => {
    if (keyCodeNumberRange(event.keyCode)) {

    } else {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
}

const downsideRateRange = () => {
    if (downsideRate.value > 100) {
        downsideRate.value = 100;
    }
    if (downsideRate.value < 0) {
        downsideRate.value = 0;
    }
}
const cancel = () => {
    $vfm.hide('sellModal');
}

</script>

<template>
    <vue-final-modal classes="w-full flex justify-center" name="sellModal" esc-to-close fit-parent>
        <div class="h-full bg-tertiary-900 text-white overflow-auto xl:w-modal-md 3xl:w-modal-big">
            <div class="text-right text-xl p-5">
                <font-awesome-icon
                    :icon="['fas', 'times']"
                    class="cursor-pointer hover:text-tertiary-400 transition"
                    @click="cancel"
                />
            </div>
            <div class="text-center relative mt-1.75 pb-2.5">
                <div class="font-press text-2xl mx-6">List Item for Sale</div>
            </div>
            <div class="grid grid-cols-8 text-white my-9 px-4 lg:pl-17.5 lg:pr-17">
                <div class="col-span-full lg:col-span-3 lg:-mr-3.5 3xl:pr-2.25">
                    <div
                        class="relative overflow-hidden p-6 bg-[url('/images/nfts/img10.png')] bg-cover border border-black w-full pt-70per"
                    ></div>
                    <div class="flex w-full text-sm font-ibm-bold mt-7">
                        <div class="pt-0.75">
                            <detail-button class="text-primary-900">Kyle White</detail-button>
                            <detail-button class="text-2xl mt-1.5">{{ asset.name }}</detail-button>
                        </div>
                        <div class="grow"></div>
                        <div class="py-0.5">
                            <div>Price</div>
                            <div class="text-sm font-ibm-light flex items-center mt-3">
                                <img src="/images/currencies/curr-1.png" class="w-4 h-4 mr-2.5" />
                                0
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-span-full lg:col-span-5 relative text-lg font-ibm-medium mr-0.5 lg:pl-10.25 3xl:pl-9 ml-px"
                >
                    <div class="flex">
                        Choose a collection
                        <font-awesome-icon :icon="['fas', 'question-circle']" class="text-11 ml-1" />
                    </div>
                    <div class="grid grid-cols-1 xl:grid-cols-2 mt-3 pb-0.75 gap-4.5 relative">
                        <collection />
                        <nftmx-button
                            color="primary"
                            label="CREATE NEW COLLECTION"
                            :small="true"
                            :class="['font-press text-xs 3xl:text-sm h-13.5']"
                        />
                    </div>
                    <div class="flex mt-6">
                        Type of sale
                        <font-awesome-icon :icon="['fas', 'question-circle']" class="text-11 ml-1" />
                    </div>
                    <div class="flex my-3">
                        <nftmx-button
                            outline
                            color="primary-900"
                            label="FIX SALE"
                            :class="[sale === saleType.FIX_SALE ? 'bg-tertiary-700' : '', 'font-ibm-bold text-sm pt-3.5 pb-4 border-2 border-black w-1/2 hover:bg-tertiary-700 text-primary-900 tracking-wide']"
                            @click="sale = saleType.FIX_SALE"
                        />
                        <nftmx-button
                            outline
                            color="primary-900"
                            label="AUCTION"
                            :class="[sale === saleType.AUCTION ? 'bg-tertiary-700' : '', 'font-ibm-bold text-sm pt-3.5 pb-4 border-2 border-black border-l-0 w-1/2 text-primary-900 hover:bg-tertiary-700 tracking-wide']"
                            @click="sale = saleType.AUCTION"
                        />
                    </div>
                    <div class="flex mt-8">
                        Price
                        <font-awesome-icon :icon="['fas', 'question-circle']" class="text-11 ml-1" />
                    </div>
                    <div class="flex flex-wrap sm:flex-nowrap mt-3.5 mb-6 font-ibm text-sm">
                        <network class="w-full xl:w-1/3" color="black" />
                        <input
                            v-model="nftPrice"
                            class="focus:outline-none border-2 sm:border-l-0 h-13.5 border-black text-white placeholder-tertiary-500 bg-tertiary-700 w-full pl-4.75 font-ibm text-sm"
                            placeholder="Type of amount"
                            @keydown="preventKey($event)"
                        />
                    </div>
                    <div class="flex pt-0.75">
                        Days of protection to offer
                        <font-awesome-icon :icon="['fas', 'question-circle']" class="text-11 ml-1" />
                    </div>
                    <div class="mb-7">
                        <div
                            @click="handleCalendar"
                            class="flex mt-3.5 font-ibm text-sm cursor-pointer"
                        >
                            <div
                                class="flex items-center gap-5 border-2 h-13.5 border-black text-white bg-tertiary-700 w-full pl-5 font-ibm-light text-sm"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'calendar-alt']"
                                    class="text-lg ml-0.75 mr-0.5"
                                />
                                {{ period / 86400 + ' days' }}
                            </div>
                        </div>
                        <v-date-picker
                            v-if="openCalendar"
                            v-model="downsidePeriod"
                            :min-date="new Date()"
                            color="red"
                            is-dark
                            is-range
                            is-expanded
                            :columns="$screens({ default: 1, lg: 2 })"
                        />
                    </div>
                    <div class="flex pt-0.5">
                        Downside Protection to Offer
                        <font-awesome-icon :icon="['fas', 'question-circle']" class="text-11 ml-1" />
                    </div>
                    <div class="flex mt-3.5 mb-4 font-ibm text-sm">
                        <input
                            v-model="downsideRate"
                            class="focus:outline-none border-2 h-13.5 border-black text-white placeholder-tertiary-500 bg-tertiary-700 w-full px-6 font-ibm text-sm"
                            placeholder="0"
                            @keydown="preventKey($event)"
                            @input="downsideRateRange()"
                        />
                        <div class="w-14 h-13.5 px-4 bg-black flex items-center justify-center">%</div>
                    </div>
                    <div class="flex justify-between pt-4.5">
                        <div>Set as a bundle</div>
                        <nftmx-toggle v-model="bundleValue" />
                    </div>
                    <div class="mt-6.25">
                        <div class="flex justify-between">
                            <div class="mb-1">Reverse for specific buyer</div>
                            <nftmx-toggle v-model="reverseValue" />
                        </div>
                        <div
                            class="font-ibm text-xs text-tertiary-500"
                        >This item can be purchased as a soon it's listed</div>
                    </div>
                    <div
                        class="flex text-xs font-ibm-semi-bold text-primary-900 mt-8 mb-4.5 pb-0.5 cursor-pointer w-fit"
                        @click="moreOption = !moreOption"
                    >
                        {{ !moreOption ? 'More options' : 'Fewer options' }}
                        <div class="self-center cursor-pointer ml-5.25">
                            <font-awesome-icon
                                v-if="!moreOption"
                                :icon="['fas', 'sort-down']"
                                class
                            />
                            <font-awesome-icon v-if="moreOption" :icon="['fas', 'sort-up']" class />
                        </div>
                    </div>
                    <div v-if="moreOption">
                        <div class="flex pt-0.5">Add hashtags</div>
                        <div class="flex mt-3.5 mb-4 font-ibm text-sm">
                            <Multiselect
                                v-model="hashtagValue"
                                mode="tags"
                                :searchable="true"
                                :createTag="true"
                                :options="hashtagOptions"
                                class="font-ibm text-11 z-10"
                            >
                                <template v-slot:tag="{}">{{ }}</template>
                            </Multiselect>
                        </div>
                        <div class="flex flex-wrap gap-3">
                            <nftmx-hashtag
                                v-for="(name, index) in hashtagValue"
                                :key="index"
                                :value="name"
                                @click="deselectHashtag(name)"
                            />
                        </div>
                    </div>
                    <nftmx-divider class="mt-9 mb-6" />
                    <div class="flex pt-0.75">
                        Fees
                        <font-awesome-icon :icon="['fas', 'question-circle']" class="text-11 ml-1" />
                    </div>
                    <div class="mt-4">
                        <div class="flex py-1 text-xs font-ibm-medium text-tertiary-500">
                            <div>Service Fee</div>
                            <div class="grow"></div>
                            <div>2.5%</div>
                        </div>
                        <div class="flex py-2.5 text-xs font-ibm-medium text-tertiary-500">
                            <div>Creator Company</div>
                            <div class="grow"></div>
                            <div>2.5%</div>
                        </div>
                    </div>
                    <div class="w-full mt-9 pt-0.5 pb-2.5 mb-17">
                        <nftmx-button
                            :disabled="disabled"
                            color="primary"
                            label="COMPLETE LISTING"
                            class="w-full font-press text-sm lg:text-lg"
                            @click="createOrder()"
                        />
                    </div>
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>

<style scoped>
/deep/ .multiselect-tags-search {
    background: #343434;
}
/deep/ input.multiselect-tags-search {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: none;
}
/deep/ .multiselect {
    border: 2px solid black;
    border-radius: 0;
    background: #343434;
    min-height: 54px;
    font-size: 14px;
}
/deep/ .multiselect.is-active {
    box-shadow: none;
    border-bottom: none;
}
/deep/ .multiselect-tags-search:focus {
    outline: none;
}
/deep/ .multiselect-dropdown {
    background: #343434;
    border: 2px solid black;
    border-top: none;
    margin-left: -1px;
    margin-right: -1px;
}
/deep/ .multiselect-option {
    font-size: 14px;
}
/deep/ .multiselect-option.is-pointed {
    background: #343434;
    color: #19cb58;
}
/deep/ .multiselect-tag {
    border-radius: 0;
    padding-top: 5px;
    padding-bottom: 6px;
    background-color: #19cb58;
    font-family: "ibm-light";
    font-size: 13px;
}
/deep/ .multiselect-clear {
    display: none;
}
</style>
