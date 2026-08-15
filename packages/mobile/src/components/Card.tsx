import React from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../theme';

export interface CardProps {
  padding?: keyof typeof theme.spacing;
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ padding = 4, style, children }) => (
  <View
    style={[
      {
        backgroundColor: theme.colors.brand.white,
        borderRadius: theme.radii.lg,
        padding: theme.spacing[padding],
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
      },
      style,
    ]}
  >
    {children}
  </View>
);
