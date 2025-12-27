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
    alignItems: 'center',
    backgroundColor: palette.accent,
    borderColor: palette.accent,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  ghost: {
    backgroundColor: palette.transparent,
  },
  ghostText: {
    color: palette.accent,
  },
  text: {
    color: palette.inverseText,
    fontFamily: typography.medium,
    fontSize: 14,
  },
});

export default AccentButton;
