
// Currency conversion utility functions
// Exchange rate as of April 12, 2025 (approximate)
const USD_TO_INR_RATE = 83.5;

export const convertUSDtoINR = (usdAmount: number): number => {
  return usdAmount * USD_TO_INR_RATE;
};

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};
