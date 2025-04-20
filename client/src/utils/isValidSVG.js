function isValidSVG(svgText) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");

    // Check for parser errors
    if (doc.getElementsByTagName("parsererror").length > 0) {
      return false;
    }

    // Check if the root element is an <svg>
    const rootElement = doc.documentElement;
    return rootElement.nodeName === "svg";
  } catch (e) {
    // If an error occurs, it's not valid SVG
    return false;
  }
}

export default isValidSVG;
