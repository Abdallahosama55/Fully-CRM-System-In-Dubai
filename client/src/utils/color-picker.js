export const hexToRgba = (hex) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)";
  }
  throw new Error("Bad Hex");
};

export const rgba2hex = (rgbaColor) => {
  let a,
    rgb = rgbaColor.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || "").trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : rgbaColor;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = 0o1;
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1);
  hex = hex + a;

  return "#" + hex;
};

export const addOpacityToColor = (colorHex, opacity) => {
  colorHex = colorHex?.replace("#", "");

  const red = parseInt(colorHex.substring(0, 2), 16);
  const green = parseInt(colorHex.substring(2, 4), 16);
  const blue = parseInt(colorHex.substring(4, 6), 16);

  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

  return rgbaColor;
};

export const getOffsetTopRelativeToDocument = (element) => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
};

export const getOffsetLeftRelativeToDocument = (element) => {
  let offsetLeft = 0;
  while (element) {
    offsetLeft += element.offsetLeft;
    element = element.offsetParent;
  }
  return offsetLeft;
};

export function invertHex(hex) {
  try {
    hex = hex.replace(/^#/, "");

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Return 'white' or 'black' based on luminance
    return luminance > 0.5 ? "black" : "white";
  } catch (error) {
    return "black";
  }
}

// Example usage
