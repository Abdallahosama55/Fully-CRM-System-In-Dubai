export function getCurrencySymbol(currencyCode, locale = "en") {
  if (!currencyCode) return null;

  try {
    return (
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .formatToParts(1)
        .find((part) => part.type === "currency")?.value || null
    );
  } catch (err) {
    console.error(`Invalid currency code: ${currencyCode}`, err);
    return null;
  }
}
