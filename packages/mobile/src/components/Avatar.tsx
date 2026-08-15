import React from 'react';
import { Image, Text, View, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { theme } from '../theme';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const sizes = {
  sm: 32,
  md: 40,
  lg: 56,
};

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

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', style, textStyle }) => {
  const dim = sizes[size];
  if (src) {
    return <Image source={{ uri: src }} style={[{ width: dim, height: dim, borderRadius: dim / 2 }, style as ImageStyle]} />;
  }
  return (
    <View
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: `${theme.colors.brand.primary}1A`,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={[{ color: theme.colors.brand.primary, fontWeight: '600' }, textStyle]}>{initials(name)}</Text>
    </View>
  );
};
