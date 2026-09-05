export const currencies = {
  LKR: { code: "LKR", symbol: "Rs.", rate: 1, name: "Sri Lankan Rupee" },
  USD: { code: "USD", symbol: "$", rate: 0.0033, name: "US Dollar" }, // ~300 LKR = 1 USD
  EUR: { code: "EUR", symbol: "€", rate: 0.0031, name: "Euro" },
  GBP: { code: "GBP", symbol: "£", rate: 0.0026, name: "British Pound" },
  AUD: { code: "AUD", symbol: "A$", rate: 0.0051, name: "Australian Dollar" }
};

export const formatPrice = (amountLkr, currencyCode = "LKR", showDecimals = false) => {
  const curr = currencies[currencyCode] || currencies.LKR;
  const converted = amountLkr * curr.rate;

  if (curr.code === "LKR") {
    return `${curr.symbol} ${Math.round(converted).toLocaleString()}`;
  }

  const formattedNum = showDecimals 
    ? converted.toFixed(2) 
    : Math.round(converted).toLocaleString();

  return `${curr.symbol}${formattedNum}`;
};
