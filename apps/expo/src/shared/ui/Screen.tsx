import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { surfaceStyles } from '../theme';
import GridBackground from './GridBackground';

interface ScreenProps {
  children: React.ReactNode;
  padded?: boolean;
  contentStyle?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({ children, padded = true, contentStyle }) => (
  <GridBackground>
    <ScrollView contentContainerStyle={[styles.content, padded && styles.padded, contentStyle]}>
      {children}
    </ScrollView>
  </GridBackground>
);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  padded: {
    ...surfaceStyles.padded,
    gap: 12,
  },
});

export default Screen;
