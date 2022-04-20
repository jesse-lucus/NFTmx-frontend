<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import BodyContainer from "@/core/container/BodyContainer.vue";
import NftmxFooter from "@/core/container/NftmxFooter.vue";
import NftmxSelect from "@/core/components/basic/NftmxSelect.vue";
import NftmxSelectNetwork from "@/core/components/basic/NftmxSelectNetwork.vue";
import SettingItemRow from "@/core/components/basic/SettingItemRow.vue";
import NftmxFileUploader from "@/core/components/file-uploader/NftmxFileUploader.vue";
import NavBarSearch from "@/core/components/search/NavBarSearch.vue";
import NftmxIconInput from "@/core/components/basic/NftmxIconInput.vue";
import NftmxTextarea from "@/core/components/basic/NftmxTextarea.vue";
import NftmxButton from "@/core/components/basic/NftmxButton.vue";
import { baseURL, defaultUser } from "@/core/config";
import { useToast } from "vue-toastification";
import { emailValidate } from "@/core/utils";

const store = useStore();
const walletAddress = computed(() => store.getters["auth/walletAddress"]);
const name = ref();
const logo = ref();
const profileImg = ref();
const profileBanner = ref();
const bio = ref();
const email = ref();
const website = ref();
const twitter = ref();
const medium = ref();
const telegram = ref();
const discord = ref();
const instagram = ref();
const logoPreview = ref();
const profileImgPreview = ref();
const profileBannerPreview = ref();
const toast = useToast();
const isEmail = ref(true);

function save() {
  if (!isEmail.value) {
    toast.error("Email is not valid");
    return;
  }
  const user = new FormData();
  user.append("name", name.value);
  if (profileImg.value) {
    user.append("profileImg", profileImg.value[0]);
  }
  if (profileBanner.value) {
    user.append("profileBanner", profileBanner.value[0]);
  }
  user.append("bio", bio.value);
  user.append("email", email.value);
  user.append("website", website.value);
  user.append("twitter", twitter.value);
  user.append("instagram", instagram.value);
  store.dispatch("auth/saveProfile", user);
  toast.success("Profile saved successfully!");
}

watchEffect(() => {
  const user = store.getters["auth/user"];
  if (user) {
    name.value = user.name;
    bio.value = user.bio;
    email.value = user.email;
    website.value = user.website;
    twitter.value = user.twitter;
    instagram.value = user.instagram;
    logoPreview.value = logo.value
      ? URL.createObjectURL(logo.value[0])
      : user.logo_img
      ? baseURL + user.logo_img
      : "";
    profileImgPreview.value = profileImg.value
      ? URL.createObjectURL(profileImg.value[0])
      : user.profile_img
      ? baseURL + user.profile_img
      : "";
    profileBannerPreview.value = profileBanner.value
      ? URL.createObjectURL(profileBanner.value[0])
      : user.profile_banner
      ? baseURL + user.profile_banner
      : "";
  }
});

watchEffect(() => {
  if (!email.value) return;

  if (emailValidate(email.value)) {
    isEmail.value = true;
  } else {
    isEmail.value = false;
  }
});
const onCopy = (e) => {
  toast.success("Wallet Address is copied");
};
</script>

<template>
  <nav-bar-search></nav-bar-search>
  <body-container>
    <div class="mt-12.5 mb-2.5 text-white text-center">
      <div class="col-span-2 font-ibm-bold text-xl md:text-3xl 2xl:text-4.5xl">
        Edit My Collections
      </div>
    </div>
    <div>
      <setting-item-row class>
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-3.5">Name</div>
        </template>
        <template v-slot:value>
          <div class="font-ibm text-sm text-tertiary-400 mt-3 md:mt-0">
            <nftmx-icon-input v-model="name" />
          </div>
        </template>
      </setting-item-row>
      <setting-item-row class="mt-10 grid-cols-2 xl:grid-cols-3">
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-3.5">Logo image</div>
          <div class="font-ibm text-tertiary-400 text-sm pt-2.5">
            This image will also be used for navigation. 350 x 350 recommended.
          </div>
        </template>
        <template v-slot:value>
          <div class="md:grid md:grid-cols-8 text-tertiary-500 mt-4 xl:mt-0">
            <div class="col-span-5 md:pr-5">
              <nftmx-file-uploader
                id="logo"
                class="h-45"
                v-model="logo"
              ></nftmx-file-uploader>
            </div>
            <div class="col-span-3 md:pl-6 mt-5 md:mt-0 w-full">
              <div
                class="border-2 border-black text-center h-45 md:h-full flex flex-col justify-center pb-4"
                :style="{
                  background: 'url(' + logoPreview + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
              >
                <div v-if="!logoPreview">
                  <div class="font-ibm-bold text-lg md:text-2xl leading-9">
                    Preview Banner
                  </div>
                  <div class="text-sm">
                    Upload file to preview your profile banner
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </setting-item-row>
      <setting-item-row class="grid-cols-2 xl:grid-cols-3">
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-2.5">Featured image</div>
          <div class="font-ibm text-tertiary-400 text-sm pt-2.5">
            This image will be used for featuring your collection on the
            homepage, category pages, or other promotional areas of nftmx. 600
            x 400 recommended.
          </div>
        </template>
        <template v-slot:value>
          <div class="md:grid md:grid-cols-8 text-tertiary-500 mt-4 xl:mt-0">
            <div class="col-span-5 md:pr-5">
              <nftmx-file-uploader
                id="profileImage"
                class="h-50 md:h-79"
                v-model="profileImg"
              ></nftmx-file-uploader>
            </div>
            <div class="col-span-3 md:pl-6 mt-5 md:mt-0 w-full">
              <div
                class="border-2 border-black text-center flex flex-col justify-center w-full md:w-auto h-50 md:h-full"
                :style="{
                  background: 'url(' + profileImgPreview + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
              >
                <div v-if="!profileImgPreview">
                  <div class="font-ibm-bold text-lg md:text-2xl leading-9">
                    Preview Image
                  </div>
                  <div class="text-sm">
                    Upload file to preview your profile image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </setting-item-row>
      <setting-item-row class="mt-10 grid-cols-2 xl:grid-cols-3">
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-3.5">Banner image</div>
          <div class="font-ibm text-tertiary-400 text-sm pt-2.5">
            This image will appear at the top of your collection page. Avoid
            including too much text in this banner image, as the dimensions
            change on different devices. 1400 x 400 recommended.
          </div>
        </template>
        <template v-slot:value>
          <div class="md:grid md:grid-cols-8 text-tertiary-500 mt-4 xl:mt-0">
            <div class="col-span-5 md:pr-5">
              <nftmx-file-uploader
                id="profileBanner"
                class="h-45"
                v-model="profileBanner"
              ></nftmx-file-uploader>
            </div>
            <div class="col-span-3 md:pl-6 mt-5 md:mt-0 w-full">
              <div
                class="border-2 border-black text-center h-45 md:h-full flex flex-col justify-center pb-4"
                :style="{
                  background: 'url(' + profileBannerPreview + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
              >
                <div v-if="!profileBannerPreview">
                  <div class="font-ibm-bold text-lg md:text-2xl leading-9">
                    Preview Banner
                  </div>
                  <div class="text-sm">
                    Upload file to preview your profile banner
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </setting-item-row>
      <setting-item-row>
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-3.5">URL</div>
          <div class="font-ibm-medium text-sm text-tertiary-500 pt-2">
            Customize your URL on nftmx. Must only contain lowercase letters,
            numbers, and hyphens.
          </div>
        </template>
        <template v-slot:value>
          <div
            class="relative font-ibm text-sm text-tertiary-400 pt-3 md:pt-0"
          >
            <nftmx-icon-input v-model="email" />
            <div
              v-if="!isEmail"
              class="absolute font-ibm text-11 text-red-900 mt-1"
            >
              Please enter valid email
            </div>
          </div>
        </template>
      </setting-item-row>
      <setting-item-row class="mt-10">
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-2.25">Description</div>
          <div class="font-ibm-medium text-sm text-tertiary-500 pt-2">
            <span class="text-primary-900">Markdown</span>
            syntax is supported. 158 of 1000 characters used.
          </div>
        </template>
        <template v-slot:value>
          <div
            class="font-ibm text-sm text-tertiary-400 h-37.5 mt-4.75 md:mt-0"
          >
            <nftmx-textarea v-model="bio" />
          </div>
        </template>
      </setting-item-row>
      <setting-item-row>
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-3.5">Category</div>
          <div class="font-ibm-medium text-sm text-tertiary-500 pt-2">
            Adding a category will help make your item discoverable on nftmx.
          </div>
        </template>
        <template v-slot:value>
          <div
            class="relative flex flex-col xl:flex-row gap-4 xl:items-center font-ibm text-sm text-tertiary-400 pt-3 md:pt-0"
          >
            <button
              class="bg-primary-900 font-ibm-bold text-white flex items-center justify-center px-19 h-13.5"
            >
              Add Category
            </button>
            <div
              class="border-2 border-primary-900 h-13.5 flex items-center justify-between px-4 w-64"
            >
              <div class="text-white">Photography</div>
              <font-awesome-icon :icon="['fas', 'times']" />
            </div>
            <div>You can select a maximum of one category.</div>
          </div>
        </template>
      </setting-item-row>
      <setting-item-row class="mt-9.75">
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-3.5">Links</div>
        </template>
        <template v-slot:value>
          <div class="font-ibm text-sm text-tertiary-400 pt-4 md:pt-0">
            <div>
              <nftmx-icon-input
                v-model="website"
                iconGroup="fas"
                icon="globe"
                placeholder="Your website"
              />
            </div>
            <div class="pt-4.75">
              <nftmx-icon-input
                v-model="twitter"
                iconGroup="fab"
                icon="twitter"
                placeholder="Your twitter profile"
              />
            </div>
            <div class="pt-4.75">
              <nftmx-icon-input
                v-model="medium"
                iconGroup="fab"
                icon="medium-m"
                placeholder="Your medium profile"
              />
            </div>
            <div class="pt-4.75">
              <nftmx-icon-input
                v-model="telegram"
                iconGroup="fab"
                icon="telegram-plane"
                placeholder="Your telegram profile"
              />
            </div>
            <div class="pt-4.75">
              <nftmx-icon-input
                v-model="discord"
                iconGroup="fab"
                icon="discord"
                placeholder="Your discord profile"
              />
            </div>
            <div class="pt-4.75">
              <nftmx-icon-input
                v-model="instagram"
                iconGroup="fab"
                icon="instagram"
                placeholder="Your instagram profile"
              />
            </div>
          </div>
        </template>
      </setting-item-row>
      <setting-item-row>
        <template v-slot:item>
          <div class="font-ibm-bold text-lg pt-3.5">Display theme</div>
          <div class="font-ibm-medium text-sm text-tertiary-500 pt-2">
            Change how your items are shown.
          </div>
        </template>
        <template v-slot:value>
          <div
            class="relative grid 2xl:grid-cols-3 gap-4 items-center font-ibm text-sm text-tertiary-400 pt-3 md:pt-0"
          >
            <div
              class="cursor-pointer h-full flex gap-6 border-2 border-black transition hover:border-primary-900 p-7"
            >
              <div
                class="w-22.5 h-24.25 border-2 border-black px-5 py-3.5 bg-tertiary-700"
              >
                <div class="w-full h-full bg-primary-900" />
              </div>
              <div class="flex-1">
                <div class="font-ibm-bold text-lg text-white">Padded</div>
                <div>Recommended for assets with transparent background</div>
              </div>
            </div>
            <div
              class="cursor-pointer h-full flex gap-6 border-2 border-black transition hover:border-primary-900 p-7"
            >
              <div
                class="w-22.5 h-24.25 border-2 border-black px-2 bg-tertiary-700"
              >
                <div class="w-full h-full bg-primary-900" />
              </div>
              <div class="flex-1">
                <div class="font-ibm-bold text-lg text-white">Contained</div>
                <div>Recommended for assets that are not a 1:1 ratio</div>
              </div>
            </div>
            <div
              class="cursor-pointer h-full flex gap-6 border-2 border-black transition hover:border-primary-900 p-7"
            >
              <div class="w-22.5 h-24.25 border-2 border-black bg-tertiary-700">
                <div class="w-full h-full bg-primary-900" />
              </div>
              <div class="flex-1">
                <div class="font-ibm-bold text-lg text-white">Covered</div>
                <div>Recommended for assets that can extend to the edge</div>
              </div>
            </div>
          </div>
        </template>
      </setting-item-row>
    </div>
    <div class="mt-7.5 md:mt-25 mb-11 md:mb-20.75 flex justify-center">
      <nftmx-button
        color="primary"
        label="CREATE COLLECTIONS"
        class="font-ibm-bold w-btn-xl text-xl md:text-2xl left-0 bottom-0 h-15 md:h-17.75"
      ></nftmx-button>
    </div>
  </body-container>
</template>
