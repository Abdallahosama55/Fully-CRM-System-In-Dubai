export const replaceStringToObject = (str) => {
  const segments = str.split("\n");
  let obj = {};
  segments.forEach((segment) => {
    if (segment.trim()) {
      const [key, value] = segment.split(":");
      if (key && value !== undefined) {
        obj[key.trim()] = value.trim();
      }
    }
  });
  return Object.entries(obj);
};

export const quotationTagColor = {
  transfer: "blue",
  flight: "green",
  hotel: "orange",
  experience: "purple",
};
