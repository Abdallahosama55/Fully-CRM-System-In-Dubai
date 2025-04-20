export const makeNewProduct = (data) => {
  const productTranslation = {};
  data.productTranslations.forEach((translation) => {
    productTranslation[translation.languageCode] = {
      ...translation,
      name: `${translation.name} Copy`,
    };
  });

  const productVariant = data.productVariants.map((productVariantDatat) => {
    return {
      dimensions: productVariantDatat.dimensions,
      weight: productVariantDatat.weight,
      SKU: productVariantDatat.SKU,
      libraryId: productVariantDatat.libraryId,
      AREffectId: productVariantDatat.AREffectId,
      price: productVariantDatat.price,
      quantity: productVariantDatat.productVariantDatat,
      minimumQuantity: productVariantDatat.minimumQuantity,
      prices: productVariantDatat.prices,
      searchKeys: productVariantDatat.searchKeys,
      barCode: productVariantDatat.barCode,
      title: productVariantDatat.title,
      colorCode: productVariantDatat.colorCode,
      name: productVariantDatat.name,
      productSpecialPrice: productVariantDatat.productSpecialPrice,
      productSpecialQuantityPrice: productVariantDatat.productSpecialQuantityPrice,
      dateAvailable: productVariantDatat.dateAvailable,
      images: productVariantDatat.images || [],
    };
  });

  const sendData = {
    options: data.options,
    modelNumber: data.modelNumber,
    location: data.location,
    taxClass: data.taxClass,
    status: data.status,
    lengthClass: data.lengthClass,
    weightClass: data.weightClass,
    shippingClass: data.shippingClass,
    sortOrder: data.sortOrder,
    brandId: data.brandId,
    categories: data.categories,
    subCategories: data.subCategories,
    lable: data.lable,
    productTranslation: productTranslation,
    links: data.links || [],

    productVariant: productVariant,
  };

  return sendData;
};
