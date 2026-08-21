import React from 'react';
import { Image, Text, View } from 'react-native';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const avatarVariants = cva('items-center justify-center rounded-full bg-primary/10 overflow-hidden', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: { size: 'md' },
});

const avatarTextVariants = cva('font-semibold text-primary', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: object;
  textStyle?: object;
  className?: string;
  textClassName?: string;
}

function initials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', style, textStyle, className, textClassName }) => {
  if (src) {
    return (
      <Image
        source={{ uri: src }}
        className={cn(avatarVariants({ size }), className)}
        style={[{ width: undefined, height: undefined }, style]}
        resizeMode="cover"
      />
    );
  }
  return (
    <View className={cn(avatarVariants({ size }), className)} style={style}>
      <Text className={cn(avatarTextVariants({ size }), textClassName)} style={textStyle}>
        {initials(name)}
      </Text>
    </View>
  );
};
