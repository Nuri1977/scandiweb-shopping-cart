const CURRENCY_FORMATS = {
  USD: "en-US",
  GBP: "en-UK",
  AUD: "en-AU",
  JPY: "jp-JP",
  RUB: "bi-IN",
};

export const formatPrice = (number, currency) =>
  new Intl.NumberFormat(CURRENCY_FORMATS[currency.label] ?? "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);