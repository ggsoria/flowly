export const bankGradients: Record<string, [string, string]> = {
  mercadopago: ["#009EE3", "#006C99"],
  cash: ["#28a745", "#1d6e32"],
  uala: ["#FF4B5C", "#8e44ad"],
  santander: ["#ec0000", "#ff4d4d"],
  payoneer: ["#8e44ad", "#3461eb"],
  nexo: ["#9e9e9e", "black"],
  bcoProvincia: ["#4caf50", "#a5d6a7"],
  other: ["#9e9e9e", "#424242"],
};

export const getBankGradient = (bankId: string): [string, string] => {
  return bankGradients[bankId] || ["#4f46e5", "#9333ea"];
};
