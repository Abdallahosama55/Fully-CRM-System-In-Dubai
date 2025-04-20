function formatNumber(number) {
  try {
    // Determine if the number is negative
    const isNegative = number < 0;
    // Use the absolute value for formatting
    const absNumber = Math.abs(number.toFixed(3));

    let formattedNumber;
    if (absNumber >= 1_000_000_000) {
      formattedNumber = (absNumber / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"; // Billions
    } else if (absNumber >= 1_000_000) {
      formattedNumber = (absNumber / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"; // Millions
    } else if (absNumber >= 1_000) {
      formattedNumber = (absNumber / 1_000).toFixed(1).replace(/\.0$/, "") + "k"; // Thousands
    } else {
      formattedNumber = absNumber.toString(); // For smaller numbers
    }

    // Add the negative sign back if the number was negative
    return isNegative ? `-${formattedNumber}` : formattedNumber;
  } catch (error) {
    console.log(error);
    return number ? number?.toString() : ""; // Return the original number as a fallback
  }
}

export default formatNumber;
