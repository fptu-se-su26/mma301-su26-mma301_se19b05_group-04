export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  title: 26,
  hero: 30,
};

export const FONT_WEIGHT = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const typography = {
  title: { fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold },
  subtitle: { fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.semiBold },
  body: { fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.regular },
  caption: { fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.regular },
  small: { fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.regular },
};
