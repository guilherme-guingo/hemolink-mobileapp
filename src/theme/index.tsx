export const theme = {
  colors: {
    primary: "#C8102E",
    primaryHover: "#A50D24",
    secondary: "#1E293B",
    terciary: "#F8FAFC",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    surfaceSecondary: "#ECF5FE",
    textTitle: "#001E2F",
    textBase: "#50606F",
    textMuted: "#6C757D",
    textInverseTitle: "#FFFFFF",
    textInverseBase: "#F8FAFC",
    textInverseMuted: "#CBD5E1",
    border: "#D2DBE4",
    status: {
      success: "#00A86B",
      warning: "#FF8C00",
      danger: "#C8102E",
      neutral: "#466585",
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
};

export type Theme = typeof theme;