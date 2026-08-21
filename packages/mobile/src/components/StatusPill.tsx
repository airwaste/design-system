import React from 'react';
import { Text, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { toneForStatus } from '../tokens';

const pillVariants = cva(
  'flex-row items-center gap-1.5 self-start rounded-full px-3 py-1',
  {
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
  },
);

const dotVariants = cva('h-1.5 w-1.5 rounded-full', {
  variants: {
    tone: {
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-destructive',
      info: 'bg-info',
      neutral: 'bg-muted-foreground',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

const textVariants = cva('text-xs font-semibold', {
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

export interface StatusPillProps extends VariantProps<typeof pillVariants> {
  status: string;
  label?: string;
  style?: object;
  textStyle?: object;
  className?: string;
  textClassName?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  tone,
  style,
  textStyle,
  className,
  textClassName,
}) => {
  const resolved = (tone as ReturnType<typeof toneForStatus>) ?? toneForStatus(status);
  return (
    <View className={cn(pillVariants({ tone: resolved }), className)} style={style}>
      <View className={cn(dotVariants({ tone: resolved }))} />
      <Text className={cn(textVariants({ tone: resolved }), textClassName)} style={textStyle}>
        {label ?? status}
      </Text>
    </View>
  );
};

export { pillVariants };
