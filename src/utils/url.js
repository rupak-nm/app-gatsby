function parseSearchAndQueryParams(search, pathname) {
  const searchParams = new URLSearchParams(search);
  const result = {};

  for (let [key, value] of searchParams) {
    result[key] = value;
  }

  const coverAndProductIdRegex =
    /.*\/(covers|reports|my-policies|my-liquidity)\/([\w_-]+)(\/products\/([\w_-]+))?/gm;
  let matched = Array.from(pathname.matchAll(coverAndProductIdRegex));
  if (matched.length) {
    const [, , coverId, , productId] = matched[0];
    result.coverId = coverId;
    result.productId = productId;
  }

  const txHashRegex = /\/receipt\/(0x\w+)/gm;
  matched = Array.from(pathname.matchAll(txHashRegex));
  if (matched.length) {
    const [, txHash] = matched[0];
    result.txHash = txHash;
  }

  const timestampRegex = /\/incidents\/(\d+)/gm;
  matched = Array.from(pathname.matchAll(timestampRegex));
  if (matched.length) {
    const [, timestamp] = matched[0];
    result.timestamp = timestamp;
  }

  return result;
}

function getUrlFromQueryObject(query, path = window.location.pathname) {
  const searchParams = new URLSearchParams();

  for (let key in query) {
    searchParams.append(key, query[key]);
  }

  const queryString = searchParams.toString();

  if (queryString) {
    return `${path}?${queryString}`;
  }

  return path;
}

export { parseSearchAndQueryParams, getUrlFromQueryObject };
