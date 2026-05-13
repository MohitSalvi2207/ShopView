const EXCHANGE_RATE = 83; // 1 USD = 83 INR

/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount in USD.
 * @param {string} currency - The target currency ('USD' or 'INR').
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (currency === 'INR') {
    const inrAmount = amount * EXCHANGE_RATE;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(inrAmount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const convertToINR = (usdAmount) => {
  return usdAmount * EXCHANGE_RATE;
};
