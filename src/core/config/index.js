export const baseURL = import.meta.env.VITE_APP_SERVER_URL;
export const mainChain = import.meta.env.VITE_MAIN_CHAIN;
export const netExplorerURL = import.meta.env.VITE_NET_EXPLORER_URL;
export const cryptocompareApiKey = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;
export const marketAddress = import.meta.env.VITE_MARKET_CONTRACT_ADDRESS;

export const publicPages = ["/", "/login", "/register", "/home"];

export const walletList = [
  {
    id: "metamask",
    name: "MetaMask",
    imgUrl: "/images/wallet_logo/metamask.png",
    s_imgUrl: "/images/wallet_logo/small/metamask.png",
  },
  {
    id: "connect-wallet",
    name: "WalletConnect",
    imgUrl: "/images/wallet_logo/connect-wallet.png",
    s_imgUrl: "/images/wallet_logo/small/connect-wallet.png",
  },
  {
    id: "rainbow",
    name: "Rainbow",
    imgUrl: "/images/wallet_logo/rainbow.png",
    s_imgUrl: "/images/wallet_logo/small/rainbow.png",
  },
  {
    id: "trust",
    name: "Trust",
    imgUrl: "/images/wallet_logo/trust.png",
    s_imgUrl: "/images/wallet_logo/small/trust.png",
  },
  {
    id: "argent",
    name: "Argent",
    imgUrl: "/images/wallet_logo/argent.png",
    s_imgUrl: "/images/wallet_logo/small/argent.png",
  },
  {
    id: "gnosis",
    name: "Gnosis Safe Multisig",
    imgUrl: "/images/wallet_logo/gnosis.png",
    s_imgUrl: "/images/wallet_logo/small/gnosis.png",
  },
];

export const defaultUser = {
  bio: "",
  email: "",
  instagram: "",
  name: "Your name",
  profile_banner: "/images/creators/profile-banner-1920.png",
  profile_img: "/images/creators/profile-big.png",
  twitter: "",
  website: "",
};

export const saleType = {
  FIX_SALE: "FIX-SALE",
  AUCTION: "AUCTION",
};

export const networks = [
  {
    name: "Binance",
    icon: "/images/currencies/curr-3.png",
  },
];

export const currencies = [
  {
    name: "BNB",
    icon: "/images/currencies/curr-3.png",
  },
];

export const themeConfig = {
  xl3: 1920,
  xl2: 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
};

export const TokenType = {
  BNB: "BNB",
  ETH: "ETH",
  BTC: "BTC",
  SOL: "SOL",
};

export const syndications = [
  {
    img: [
      "/images/nfts/img1.png",
      "/images/nfts/img2.png",
      "/images/nfts/img3.png",
      "/images/nfts/img4.png",
      "/images/nfts/img5.png",
      "/images/nfts/img6.png",
      "/images/nfts/img7.png",
      "/images/nfts/img8.png",
    ],
    type: "AUCTION",
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img2.png",
    type: "FIX_SALE",
    fixPrice: 50000,
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img3.png",
    type: "FIX_SALE",
    fixPrice: 50000,
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img4.png",
    type: "AUCTION",
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img5.png",
    type: "FIX_SALE",
    fixPrice: 50000,
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img6.png",
    type: "AUCTION",
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img7.png",
    type: "AUCTION",
    lockedValue: 1548325.56,
  },
  {
    img: "/images/nfts/img8.png",
    type: "FIX_SALE",
    fixPrice: 50000,
    lockedValue: 1548325.56,
  },
];

export const assetDetailTabs = [
  "Details",
  "About the creator",
  "Chain info",
  "Downside Protection",
];

export const popularSyndications = [
  {
    name: "Mutant Ape Yacht Club",
    rate: 31.28,
    price: 50000,
  },
  {
    name: "Mutant Ape Yacht Club",
    rate: -31.28,
    price: 50000,
  },
  {
    name: "Mutant Ape Yacht Club",
    rate: 31.28,
    price: 50000,
  },
  {
    name: "Mutant Ape Yacht Club",
    rate: 31.28,
    price: 50000,
  },
  {
    name: "Mutant Ape Yacht Club",
    rate: -31.28,
    price: 50000,
  },
  {
    name: "Mutant Ape Yacht Club",
    rate: -31.28,
    price: 50000,
  },
  {
    name: "Mutant Ape Yacht Club",
    rate: 31.28,
    price: 50000,
  },
  {
    name: "Mutant Ape Yacht Club",
    rate: 31.28,
    price: 50000,
  },
];

export const defaultPagination = {
  page: 1,
  limit: 10,
};
