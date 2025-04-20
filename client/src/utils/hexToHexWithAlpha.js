function hexToHexWithAlpha(hex = "#000000", alpha) {
  // Remove the "#" if present
  hex = hex.replace(/^#/, "");

  // Expand shorthand hex (e.g., "f00" -> "ff0000")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Handle cases where the hex already includes alpha (8 characters)
  let baseHex = hex;
  if (hex.length === 8) {
    baseHex = hex.slice(0, 6); // Extract RGB part
  }

  // Ensure valid hex length (6 or 8 characters)
  if (baseHex.length !== 6) {
    console.error("Invalid hex color");
    return hex;
  }

  // Convert alpha (0-1) to a 2-digit hex value if not provided in hex
  let alphaHex =
    hex.length === 8
      ? hex.slice(6, 8)
      : Math.round(alpha * 255)
          .toString(16)
          .padStart(2, "0");

  return `#${baseHex}${alphaHex}`;
}

export default hexToHexWithAlpha;
