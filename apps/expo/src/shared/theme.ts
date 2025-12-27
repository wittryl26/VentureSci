import { DefaultTheme, Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const palette = {
  background: '#ffffff',
  grid: '#f0f4f2',
  accent: '#06402B',
  text: '#0f1d17',
  muted: '#6c7a73',
  card: '#f7faf8',
  inverseText: '#ffffff',
  transparent: 'transparent',
};

export const typography = {
  regular: 'RobotoMono_400Regular',
  medium: 'RobotoMono_500Medium',
  bold: 'RobotoMono_700Bold',
};

export const appTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.accent,
    background: palette.background,
    card: palette.card,
    text: palette.text,
    border: palette.grid,
    notification: palette.accent,
  },
};

export const surfaceStyles = StyleSheet.create({
  accentText: {
    color: palette.accent,
    fontFamily: typography.medium,
  },
  body: {
    color: palette.muted,
    fontFamily: typography.regular,
    fontSize: 14,
  },
  card: {
    backgroundColor: palette.card,
    borderColor: palette.grid,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  container: {
    backgroundColor: palette.background,
    flex: 1,
  },
  heading: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 20,
    marginBottom: 8,
  },
  padded: {
    padding: 16,
  },
});
