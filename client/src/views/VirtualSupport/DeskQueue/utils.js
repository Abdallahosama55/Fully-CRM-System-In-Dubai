export function getQueryParams(url) {
  try {
    const params = {};
    const queryString = url.substring(url.indexOf("?") + 1);
    const pairs = queryString.split("&");

    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      params[key] = value;
    }

    return params;
  } catch (e) {
    return null;
  }
}
