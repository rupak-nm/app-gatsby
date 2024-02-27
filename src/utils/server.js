function getNetworkName(chainId) {
  switch (Number(chainId)) {
    case 1:
      return "ethereum-mainnet";

    case 42161:
      return "arbitrum-one";

    case 56:
      return "binance";

    case 80001:
      return "mumbai";

    default:
      return chainId;
  }
}

async function getApiData(chainId) {
  try {
    const response = await fetch(
      `https://api.neptunemutual.net/home/product-summary/${chainId}`
    );
    const data = await response.json();

    return data.data;
    // return response.data.data;
  } catch (error) {
    console.error("Error fetching data from API", error);
    return [];
  }
}

module.exports = {
  getNetworkName,
  getApiData,
};
