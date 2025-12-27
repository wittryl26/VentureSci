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
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.grid,
    shadowColor: palette.accent,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
});

export default Card;
