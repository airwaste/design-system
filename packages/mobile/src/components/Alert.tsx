import React from 'react';
import { Text, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { toneForStatus } from '../tokens';

const alertVariants = cva('rounded-md border p-3', {
  variants: {
    tone: {
      success: 'border-success/30 bg-success/10',
      warning: 'border-warning/30 bg-warning/10',
      error: 'border-destructive/30 bg-destructive/10',
      info: 'border-info/30 bg-info/10',
      neutral: 'border-border bg-muted',
    },
  },
  defaultVariants: { tone: 'info' },
});

const alertTitleVariants = cva('font-semibold', {
  variants: {
    tone: {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
      info: 'text-info',
      neutral: 'text-foreground',
    },
  },
  defaultVariants: { tone: 'info' },
});

const alertTextVariants = cva('text-[13px]', {
  variants: {
    tone: {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
      info: 'text-info',
      neutral: 'text-muted-foreground',
    },
  },
  defaultVariants: { tone: 'info' },
});

export interface AlertProps extends VariantProps<typeof alertVariants> {
  status?: string;
  title?: string;
  style?: object;
  textStyle?: object;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  tone,
  status,
  title,
  style,
  textStyle,
  className,
  textClassName,
  children,
}) => {
  const resolved = (tone as VariantProps<typeof alertVariants>['tone']) ?? (status ? toneForStatus(status) : 'info');
  return (
    <View className={cn(alertVariants({ tone: resolved }), className)} style={style}>
      {title && (
        <Text
          className={cn(alertTitleVariants({ tone: resolved }), !children && 'mb-0')}
          style={textStyle}
        >
          {title}
        </Text>
      )}
      {children && (
        <Text className={cn(alertTextVariants({ tone: resolved }), title && 'mt-1', textClassName)} style={textStyle}>
          {children}
        </Text>
      )}
    </View>
  );
};

export { alertVariants };
