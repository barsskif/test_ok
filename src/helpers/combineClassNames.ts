export const combineClassNames = (...classNames: string[]) => {
  return classNames.filter(Boolean).join(' ');
};
