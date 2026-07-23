export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  ITINERARY_ITEMS: '@itinerary_items',
  AI_ITINERARIES: '@ai_itineraries',
  WORKSHOP_BOOKINGS: '@workshop_bookings',
};

export const DEMO_USER = {
  id: 'demo-001',
  fullName: 'Nguyễn Văn Demo',
  email: 'demo@gmail.com',
  phone: '0901234567',
  avatar: '',
  role: 'user' as const,
};

export const DEMO_TOKEN = 'demo-jwt-token-12345';

export const COLORS = {
  primary: "#0284C7",
  primaryLight: "#38BDF8",
  primaryDark: "#075985",

  cyan: "#06B6D4",
  mint: "#67E8F9",
  skySoft: "#E0F7FA",

  secondary: "#F97316",
  secondaryLight: "#FFEDD5",
  accent: "#8B5CF6",

  background: "#EAFBFF",
  surface: "#FFFFFF",
  surfaceSoft: "#F8FDFF",

  text: "#0F172A",
  textSecondary: "#475569",
  muted: "#64748B",
  border: "#D7EEF7",

  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",

  white: "#FFFFFF",
  black: "#000000",
};

export const GRADIENTS = {
  main: ['#075985', '#0284C7', '#38BDF8', '#A7F3D0'] as const,
  mainLight: ['#0284C7', '#38BDF8', '#CFFAFE'] as const,
  owner: ['#0284C7', '#06B6D4', '#F97316'] as const,
  admin: ['#075985', '#0284C7', '#8B5CF6'] as const,
  heroBanner: ['#0284C7', '#38BDF8', '#F97316'] as const,
  aiSection: ['#8B5CF6', '#6366F1', '#0EA5E9'] as const,
  workshopSection: ['#F97316', '#FDBA74', '#FACC15'] as const,
  loginBackground: ['#0284C7', '#0EA5E9', '#2DD4BF'] as const,
  profileHeader: ['#0284C7', '#6366F1', '#8B5CF6'] as const,
  primaryButton: ['#0284C7', '#0EA5E9'] as const,
  secondaryButton: ['#F97316', '#FDBA74'] as const,
  accentButton: ['#8B5CF6', '#6366F1'] as const,
};

export const categoryColors: Record<string, { background: string; text: string }> = {
  'Di sản': { background: '#F3E8FF', text: '#7E22CE' },
  'Làng nghề': { background: '#FFEDD5', text: '#C2410C' },
  'Biển': { background: '#E0F2FE', text: '#0284C7' },
  'Ẩm thực': { background: '#FEF9C3', text: '#A16207' },
  'An Thượng': { background: '#FFE4E6', text: '#BE123C' },
  'Workshop': { background: '#CCFBF1', text: '#0F766E' },
  'Thủ công': { background: '#FFEDD5', text: '#C2410C' },
  'Nghệ thuật': { background: '#F3E8FF', text: '#7E22CE' },
  'Văn hóa': { background: '#FFE4E6', text: '#BE123C' },
  'Check-in': { background: '#FEF3C7', text: '#92400E' },
  'Giải trí': { background: '#ECFDF5', text: '#065F46' },
  'Trải nghiệm': { background: '#EDE9FE', text: '#5B21B6' },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 32,
};

export const SHADOW = {
  card: {
    shadowColor: '#075985',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 6,
  },
};
