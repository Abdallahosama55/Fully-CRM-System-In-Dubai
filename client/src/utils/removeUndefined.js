export const removeUndefined = (arr, language, mainlanguageCode) => {
  return arr.filter((subArr) => {
    let obj = subArr[1];
    let name = obj[`name${mainlanguageCode}`];
    language.forEach((lang) => {
      if (lang.code !== mainlanguageCode) {
        window[`name${lang.code}`] = obj[`name${lang.code}`];
      }
    });
    let ownModel = obj.ownModel;
    delete obj.nameEn;
    delete obj.nameAr;
    delete obj.ownModel;
    for (const prop in obj) {
      if (
        obj.hasOwnProperty(prop) &&
        obj[prop] !== undefined &&
        obj[prop] !== null &&
        obj[prop] !== "" &&
        obj[prop]?.length !== 0
      ) {
        obj[`name${mainlanguageCode}`] = name;
        language.forEach((lang) => {
          if (lang.code !== mainlanguageCode) {
            obj[`name${lang.code}`] = [`name${lang.code}`];
          }
        });

        obj.ownModel = ownModel;
        return true;
      }
    }
    obj[`name${mainlanguageCode}`] = name;
    language.forEach((lang) => {
      if (lang.code !== mainlanguageCode) {
        obj[`name${lang.code}`] = [`name${lang.code}`];
      }
    });
    obj.ownModel = ownModel;
    return false;
  });
};
