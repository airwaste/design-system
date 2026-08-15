import React from 'react';
import { ActivityIndicator, Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const variantBg: Record<ButtonVariant, string> = {
  primary: theme.colors.brand.primary,
  secondary: theme.colors.brand.light,
  ghost: 'transparent',
  danger: theme.colors.status.error,
};

const variantText: Record<ButtonVariant, string> = {
  primary: theme.colors.brand.white,
  secondary: theme.colors.brand.dark,
  ghost: theme.colors.brand.primary,
  danger: theme.colors.brand.white,
};

const sizePad: Record<ButtonSize, { py: number; px: number; fontSize: number }> = {
  sm: { py: 6, px: 12, fontSize: 13 },
  md: { py: 10, px: 16, fontSize: 14 },
  lg: { py: 14, px: 20, fontSize: 16 },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  onPress,
  style,
  textStyle,
  children,
}) => {
  const s = sizePad[size];
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: variantBg[variant],
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderRadius: theme.radii.md,
          opacity: disabled || loading ? 0.5 : pressed ? 0.85 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
        },
        style,
      ]}
    >
      {loading && <ActivityIndicator size="small" color={variantText[variant]} />}
      <Text style={[{ color: variantText[variant], fontWeight: '600', fontSize: s.fontSize }, textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
};
