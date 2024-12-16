export const formatCurrency = (n: number): string =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
