import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native';
import { palette, typography } from '../theme';

interface AccentButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'solid' | 'ghost';
  accessibilityLabel?: string;
}

export const AccentButton: React.FC<AccentButtonProps> = ({
  label,
  onPress,
  variant = 'solid',
  accessibilityLabel,
}) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.button, variant === 'ghost' && styles.ghost]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 6,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#ffffff',
    fontFamily: typography.medium,
    fontSize: 14,
  },
  ghostText: {
    color: palette.accent,
  },
});

export default AccentButton;
