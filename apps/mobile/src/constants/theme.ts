/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  primary: '#4F46E5', // Soft Indigo
  secondary: '#60A5FA', // Soft Sky Blue
  success: '#34D399', // Soft Green
  background: '#FCFCFD', // Warm White
  surface: '#FFFFFF', // Card Background
  textPrimary: '#1F2937', // Primary Text
  textSecondary: '#6B7280', // Secondary Text
  border: '#E5E7EB', // Border
  error: '#F87171', // Soft Red
  warning: '#FBBF24', // Warning Yellow
} as const;

export const BorderRadius = {
  button: 16,
  card: 20,
  input: 14,
  bottomSheet: 28,
  productImage: 18,
} as const;

export const Shadows = {
  default: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2, // for Android
  },
} as const;

export type ThemeColor = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'ClashDisplay-Regular',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'ClashDisplay-Regular',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'Work Sans, var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
