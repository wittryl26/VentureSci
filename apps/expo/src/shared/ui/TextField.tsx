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
  label: {
    fontFamily: typography.medium,
    color: palette.text,
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.grid,
    borderRadius: 12,
    padding: 12,
    fontFamily: typography.regular,
    color: palette.text,
  },
});

export default TextField;
