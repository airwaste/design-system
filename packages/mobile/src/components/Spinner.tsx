import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { theme } from '../theme';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  style?: ViewStyle;
}

const rnSize: Record<SpinnerSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', style }) => (
  <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
    <ActivityIndicator size={rnSize[size]} color={theme.colors.brand.primary} />
  </View>
);
