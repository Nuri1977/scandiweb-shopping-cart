import { isEqual, findIndex, findLastIndex, transform } from "lodash";

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

export const isCartItemEqual = (a, b) =>
  a.id === b.id && isEqual(a.selectedAttributes, b.selectedAttributes);

export const findCartItemIdx = (list, item, fromStart = true) =>
  fromStart
    ? findIndex(list, (listItem) => isCartItemEqual(listItem, item))
    : findLastIndex(list, (listItem) => isCartItemEqual(listItem, item));