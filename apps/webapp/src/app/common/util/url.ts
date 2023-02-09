export const padWithSlashes = (url: string) => {
  if (!url.endsWith('/')) {
    url += '/';
  }
  if (!url.startsWith('/')) {
    url = '/' + url;
  }

  return url;
};
