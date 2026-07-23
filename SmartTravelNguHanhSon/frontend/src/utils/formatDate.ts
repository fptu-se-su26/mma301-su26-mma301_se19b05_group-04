export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};
