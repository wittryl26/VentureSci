import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { palette } from '../theme';

export const Card: React.FC<ViewProps> = ({ children, style, ...rest }) => (
  <View style={[styles.card, style]} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.background,
    borderColor: palette.grid,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    padding: 16,
    shadowColor: palette.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
});

export default Card;
