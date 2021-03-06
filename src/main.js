import { createApp } from "vue";
import SolanaWallet from "solana-wallets-vue"
import App from "./App.vue";
import "./index.css";
import "./assets/custom.css";
import router from "./router";
import store from "./store";
import vClickOutside from "click-outside-vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import VCalendar from "v-calendar";
import Moralis from "./plugins/moralis";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import VueClipboard from "vue3-clipboard";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import 'solana-wallets-vue/styles.css';

import {
  faFilter,
  faExternalLinkAlt,
  faSearch,
  faTimes,
  faQuestionCircle,
  faMoon,
  faSun,
  faSortUp,
  faSortDown,
  faCloudUploadAlt,
  faEllipsisV,
  faThumbsUp,
  faUndo,
  faShareAlt,
  faBars,
  faCalendarAlt,
  faCopy,
  faGlobe,
  faCog,
  faEdit,
  faBell,
  faUser,
  faPlay,
  faPause,
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTelegramPlane,
  faDiscord,
  faTwitter,
  faMediumM,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import "v-calendar/dist/style.css";
import { vfmPlugin } from "vue-final-modal";

import{
  PhantomWalletAdapter,
  SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets";

library.add(
  faFilter,
  faExternalLinkAlt,
  faSearch,
  faTimes,
  faQuestionCircle,
  faFacebookF,
  faTelegramPlane,
  faDiscord,
  faTwitter,
  faCopy,
  faGlobe,
  faCog,
  faMediumM,
  faMoon,
  faSun,
  faCopyright,
  faSortUp,
  faSortDown,
  faCloudUploadAlt,
  faEllipsisV,
  faThumbsUp,
  faUndo,
  faShareAlt,
  faBars,
  faCalendarAlt,
  faInstagram,
  faEdit,
  faBell,
  faUser,
  faPlay,
  faPause,
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faArrowUp
);

const options = {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const wallletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter()
  ],
  autoConnect: true,
}

createApp(App)
  .provide("$moralis", Moralis)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .use(VCalendar, {})
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  .use(SolanaWallet, wallletOptions)
  .use(vfmPlugin)
  .use(Toast, options)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("Multiselect", Multiselect)
  .mount("#app");
