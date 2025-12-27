import { DefaultTheme, Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const palette = {
  background: '#ffffff',
  grid: '#f0f4f2',
  accent: '#06402B',
  text: '#0f1d17',
  muted: '#6c7a73',
  card: '#f7faf8',
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
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  padded: {
    padding: 16,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.grid,
  },
  heading: {
    fontFamily: typography.bold,
    fontSize: 20,
    color: palette.text,
    marginBottom: 8,
  },
  body: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: palette.muted,
  },
  accentText: {
    fontFamily: typography.medium,
    color: palette.accent,
  },
});
