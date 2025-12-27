import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { palette, typography } from '../theme';

interface TextFieldProps extends TextInputProps {
  label: string;
}

export const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={palette.muted}
      style={styles.input}
      autoCapitalize="none"
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  input: {
    borderColor: palette.grid,
    borderRadius: 12,
    borderWidth: 1,
    color: palette.text,
    fontFamily: typography.regular,
    padding: 12,
  },
  label: {
    color: palette.text,
    fontFamily: typography.medium,
    fontSize: 13,
  },
});

export default TextField;
