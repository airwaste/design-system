import React from 'react';
import { Text, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { toneForStatus } from '../tokens';

const badgeVariants = cva('self-start rounded-full px-2 py-0.5', {
  variants: {
    tone: {
      success: 'bg-success/15',
      warning: 'bg-warning/15',
      error: 'bg-destructive/15',
      info: 'bg-info/15',
      neutral: 'bg-muted',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

const badgeTextVariants = cva('text-[11px] font-semibold', {
  variants: {
    tone: {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
      info: 'text-info',
      neutral: 'text-muted-foreground',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  status?: string;
  label?: string;
  style?: object;
  textStyle?: object;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  tone,
  status,
  label,
  style,
  textStyle,
  className,
  textClassName,
  children,
}) => {
  const resolved = (tone as VariantProps<typeof badgeVariants>['tone']) ?? (status ? toneForStatus(status) : 'neutral');
  return (
    <View className={cn(badgeVariants({ tone: resolved }), className)} style={style}>
      <Text className={cn(badgeTextVariants({ tone: resolved }), textClassName)} style={textStyle}>
        {children ?? label ?? status}
      </Text>
    </View>
  );
};

export { badgeVariants };
