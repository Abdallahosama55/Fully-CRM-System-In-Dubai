export default function resize(url, width) {
  return url ? `${url.split(/\.(?=[^\.]+$)/)[0]}_${width}.webp` : url;
}
