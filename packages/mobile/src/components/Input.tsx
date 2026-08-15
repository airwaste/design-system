import React from 'react';
import { Text, TextInput, View, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

export interface InputProps {
  label?: string;
  error?: string;
  hint?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  style,
  inputStyle,
}) => (
  <View style={[{ gap: 4 }, style]}>
    {label && <Text style={{ fontSize: 13, fontWeight: '500', color: theme.colors.neutral[700] }}>{label}</Text>}
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[
        {
          borderWidth: 1,
          borderColor: error ? theme.colors.status.error : theme.colors.neutral[300],
          borderRadius: theme.radii.md,
          paddingVertical: 10,
          paddingHorizontal: 12,
          fontSize: 14,
          color: theme.colors.neutral[900],
          backgroundColor: theme.colors.brand.white,
        },
        inputStyle,
      ]}
    />
    {error ? (
      <Text style={{ fontSize: 11, color: theme.colors.status.error }}>{error}</Text>
    ) : hint ? (
      <Text style={{ fontSize: 11, color: theme.colors.neutral[500] }}>{hint}</Text>
    ) : null}
  </View>
);
