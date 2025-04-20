const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function combos(list, n = 0, result = [], current = []) {
  if (n === list.length) result.push(current);
  else
    list[n].forEach((item) => combos(list, n + 1, result, [...current, item]));

  return result;
}

function getSpecial(data) {
  let specialPrice = undefined,
    specialQuantityPrice = undefined;

  if (data.mainSpecialPrice && data.mainSpecialPriceDate) {
    specialPrice = [
      {
        price: data.mainSpecialPrice,
        startDate: data.mainSpecialPriceDate[0] || null,
        endDate: data.mainSpecialPriceDate[1] || null,
      },
    ];
    if (data.specialPrice && data.specialPrice.length > 0) {
      specialPrice.push(
        // eslint-disable-next-line array-callback-return
        ...data.specialPrice?.map((ele) => {
          if (ele.specialPrice && ele.specialPriceDate)
            return {
              price: ele.specialPrice,
              startDate: ele.specialPriceDate[0] || null,
              endDate: ele.specialPriceDate[1] || null,
            };
        })
      );
    }
  } else {
    // eslint-disable-next-line array-callback-return
    specialPrice = data.specialPrice?.map((ele) => {
      if (ele.specialPrice && ele.specialPriceDate)
        return {
          price: ele.specialPrice,
          startDate: ele.specialPriceDate[0] || null,
          endDate: ele.specialPriceDate[1] || null,
        };
    });
  }

  if (
    data.mainQuantity &&
    data.mainQuantityPrice &&
    data.mainQuantityPriceDate
  ) {
    specialQuantityPrice = [
      {
        quantity: data.mainQuantity,
        price: data.mainQuantityPrice,
        startDate: data.mainQuantityPriceDate[0] || null,
        endDate: data.mainQuantityPriceDate[1] || null,
      },
    ];
    if (data.quantityPrice && data.quantityPrice.length > 0) {
      specialQuantityPrice.push(
        // eslint-disable-next-line array-callback-return
        ...data.quantityPrice?.map((ele) => {
          if (ele.quantity && ele.quantityPrice && ele.quantityPriceDate)
            return {
              quantity: ele.quantity,
              price: ele.quantityPrice,
              startDate: ele.quantityPriceDate[0] || null,
              endDate: ele.quantityPriceDate[1] || null,
            };
        })
      );
    }
  } else {
    // eslint-disable-next-line array-callback-return
    specialQuantityPrice = data.quantityPrice?.map((ele) => {
      if (ele.quantity && ele.quantityPrice && ele.quantityPriceDate)
        return {
          quantity: ele.quantity,
          price: ele.quantityPrice,
          startDate: ele.quantityPriceDate[0] || null,
          endDate: ele.quantityPriceDate[1] || null,
        };
    });
  }

  return {
    specialPrice,
    specialQuantityPrice,
  };
}

export { reorder, combos, getSpecial };
