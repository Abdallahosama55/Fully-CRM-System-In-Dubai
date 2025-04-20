export const getSearchParamsFromURIComponent = (search, name = "q") => {
  const params = new URLSearchParams(search);
  const searchParamsURIComponent = params.get(name);
  const searchParams = searchParamsURIComponent
    ? JSON.parse(decodeURIComponent(searchParamsURIComponent))
    : {};

  return searchParams;
};

export const getSearchParamsAsURIComponent = (obj = {}, name = "q") => {
  return `?${name}=${encodeURIComponent(JSON.stringify(obj))}`;
};
