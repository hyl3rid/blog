const size = {
  xs: "370px",
  sm: "576px",
  md: "735px",
  lg: "1049px",
};

const device = {
  xs: `max-width: ${size.xs}`,
  sm: `max-width: ${size.sm}`,
  md: `max-width: ${size.md}`,
  minmd: `min-width: ${size.md}`,
  lg: `max-width: ${size.lg}`,
  minlg: `min-width: ${size.lg}`,
};

export { size, device };
