export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + 'đ';
};

export const generateBookingCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'WS-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
