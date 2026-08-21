import React from 'react';
import { View } from 'react-native';
import { cn } from '../lib/utils';

export interface CardProps {
  padding?: number;
  style?: object;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ padding = 16, style, className, children }) => (
  <View
    className={cn('rounded-lg border border-border bg-card shadow-sm', className)}
    style={[padding !== 16 ? { padding } : undefined, style]}
  >
    {children}
  </View>
);
