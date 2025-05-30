export default function formatCurrency(priceString: string, currency: "IDR" | "USD" = "IDR"): string {
  const number = parseInt(priceString.replace(/\D/g, ""), 10); // Hapus semua karakter non-digit

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0
  }).format(number);
}
