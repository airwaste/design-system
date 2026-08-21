import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { cn } from '../lib/utils';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  style?: object;
  className?: string;
}

const rnSize: Record<SpinnerSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', style, className }) => (
  <View className={cn('items-center justify-center', className)} style={style}>
    <ActivityIndicator size={rnSize[size]} color="#15803D" />
  </View>
);
