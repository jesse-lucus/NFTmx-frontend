import http from "../utils/http-common";
import { cryptocompareApiKey, defaultPagination, TokenType } from "../config";
import axios from "axios";
import { queryBuilder } from "../utils";

class MatketService {
  getOrder(id) {
    return http.get(`orders?id=${id}`);
  }
  getSaleOrders(walletAddress) {
    return http.get(`orders/sale?walletAddress=${walletAddress}`);
  }

  // ledger
  soldItems(page = defaultPagination.page, limit = defaultPagination.limit) {
    return http.get(`orders/sold?page=${page}&limit=${limit}`);
  }

  canceledItems(
    page = defaultPagination.page,
    limit = defaultPagination.limit
  ) {
    return http.get(`orders/canceled?page=${page}&limit=${limit}`);
  }

  listedItems(page = defaultPagination.page, limit = defaultPagination.limit) {
    return http.get(`orders/active?page=${page}&limit=${limit}`);
  }

  // recent order logs
  getOrderLogs(page = defaultPagination.page, limit = defaultPagination.limit) {
    return http.get(`orders/log?page=${page}&limit=${limit}`);
  }

  // vote
  vote(tokenAddress, tokenId, userId) {
    return http.post(`tokens/vote`, { tokenAddress, tokenId, userId });
  }

  cancelVote(tokenAddress, tokenId, userId) {
    return http.delete(
      `tokens/vote?tokenAddress=${tokenAddress}&tokenId=${tokenId}&userId=${userId}`
    );
  }

  getTokenInfo(tokenAddress, tokenId) {
    return http.get(
      `tokens/info?tokenAddress=${tokenAddress}&tokenId=${tokenId}`
    );
  }

  getUSDFromToken(token) {
    if (token === TokenType.BNB) {
      return axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD&api_key=${cryptocompareApiKey}`
      );
    } else if (token === TokenType.ETH) {
      return axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${cryptocompareApiKey}`
      );
    } else {
      console.log("MarketService getUSDFromToken: Not implemented yet.");
      return amount;
    }
  }

  createHashTags(hashtagNames, tokenAddress, tokenId, tokenName) {
    return http.post("tokens/hashtags", {
      hashtagNames,
      tokenAddress,
      tokenId,
      tokenName,
    });
  }

  getHashtagNames() {
    return http.get("hashtags");
  }

  // fetch orders related to the connected user.
  getMyOrders(userId) {
    return http.get(`orders/mine?userId=${userId}`);
  }

  hideToken(tokenAddress, tokenId, userId) {
    return http.post(`tokens/hide`, { tokenAddress, tokenId, userId });
  }

  unhideToken(tokenAddress, tokenId, userId) {
    return http.delete(
      `tokens/unhide?tokenAddress=${tokenAddress}&tokenId=${tokenId}&userId=${userId}`
    );
  }

  getNFTsFromWallet(walletAddress) {
    return http.get(`tokens/wallet?address=${walletAddress}`);
  }

  getAsset(id) {
    return http.get(`eth-nfts/${id}`);
  }

  getEthNfts(data) {
    console.log(queryBuilder(data));
    return http.get(`eth-nfts?${queryBuilder(data)}`);
  }

  getEthNftsCount() {
    return http.get(`eth-nfts/count/all`);
  }

  getEthContracts() {
    return http.get(`eth-contract`);
  }

  getEthContract(address) {
    return http.get(`eth-contract/${address}`);
  }

  filterEthContractByName(name) {
    return http.get(`eth-contract/filter-by/name?name=${name}`);
  }

  getDownsideProtectionFunds() {
    return http.get(`orders/funds/pending`);
  }

  getTotalSalesFunds() {
    return http.get(`orders/funds/sales`);
  }
}

export default new MatketService();
