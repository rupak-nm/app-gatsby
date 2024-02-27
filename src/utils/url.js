function parseSearchAndQueryParams(search, pathname) {
  const searchParams = new URLSearchParams(search);
  const result = {};

  for (let [key, value] of searchParams) {
    result[key] = value;
  }

  const matchRegex = /.*\/covers\/([\w_-]+)(\/products\/([\w_-]+))?/gm;
  const matched = Array.from(pathname.matchAll(matchRegex));

  if (matched.length) {
    const [, coverId, , productId] = matched[0];
    result.coverId = coverId;
    result.productId = productId;
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
