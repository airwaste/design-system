import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

export interface TagProps {
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ color = theme.colors.brand.primary, style, textStyle, children }) => (
  <View
    style={[
      { backgroundColor: `${color}26`, paddingVertical: 2, paddingHorizontal: 6, borderRadius: theme.radii.md, alignSelf: 'flex-start' },
      style,
    ]}
  >
    <Text style={[{ color, fontSize: 12, fontWeight: '500' }, textStyle]}>{children}</Text>
  </View>
);
