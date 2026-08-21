import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '../lib/utils';

export interface TagProps {
  color?: string;
  style?: object;
  textStyle?: object;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ color = '#15803D', style, textStyle, className, textClassName, children }) => (
  <View
    className={cn('self-start rounded-md px-1.5 py-0.5', className)}
    style={[{ backgroundColor: `${color}26` }, style]}
  >
    <Text className={cn('text-xs font-medium', textClassName)} style={[{ color }, textStyle]}>
      {children}
    </Text>
  </View>
);
