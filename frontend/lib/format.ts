export function formatPeso(amount: number) {
  if (amount <= 0) {
    return "Price at kiosk";
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
}
