// utils/currency.ts

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRupiahWithDecimals = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatRupiahShort = (amount: number): string => {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  } else if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)}Jt`;
  } else if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(0)}K`;
  }
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

// Contoh penggunaan:
// formatRupiah(2344000) -> "Rp2.344.000"
// formatRupiahWithDecimals(2344000) -> "Rp2.344.000,00"
// formatRupiahShort(2344000) -> "Rp 2.3Jt"
