import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const buttonVariants = cva(
  'flex-row items-center justify-center gap-2 rounded-md active:opacity-85 disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        ghost: 'bg-transparent',
        danger: 'bg-destructive',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const buttonTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-primary',
      danger: 'text-destructive-foreground',
    },
    size: {
      sm: 'text-[13px]',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> & { variants: typeof buttonVariants } = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  onPress,
  style,
  textStyle,
  className,
  textClassName,
  children,
}) => (
  <Pressable
    role="button"
    disabled={disabled || loading}
    onPress={onPress}
    className={cn(buttonVariants({ variant, size }), fullWidth && 'self-stretch w-full', className)}
    style={style}
  >
    {loading && <ActivityIndicator size="small" color={loadingColor[variant ?? 'primary']} />}
    <Text className={cn(buttonTextVariants({ variant, size }), textClassName)} style={textStyle}>
      {children}
    </Text>
  </Pressable>
);
Button.displayName = 'Button';
Button.variants = buttonVariants;

// ActivityIndicator needs a concrete color; CSS variables are not readable here.
const loadingColor: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  secondary: '#166534',
  ghost: '#15803D',
  danger: '#FFFFFF',
};

export { buttonVariants, buttonTextVariants };
