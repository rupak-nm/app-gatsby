function parseSearch(search) {
  const searchParams = new URLSearchParams(search);
  const result = {};

  for (let [key, value] of searchParams) {
    result[key] = value;
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

export { parseSearch, getUrlFromQueryObject };
