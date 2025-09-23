export const colors = {
  red: '#c5004a',
  darkred: '#7f0036',
  lightgray: '#e0e0e0',
  gray: '#c0c0c0',
  darkgray: '#333',
  navy: '#17050f',
  blue: '#082840',
  white: '#fff',
  cream: '#f5f5dc',
} as const;

export type ColorKey = keyof typeof colors;
