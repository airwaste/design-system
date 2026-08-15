import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';
import { toneForStatus, type Tone } from '@airwaste/design-tokens';
import { toneColor } from '../theme';

export interface BadgeProps {
  tone?: Tone;
  status?: string;
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ tone, status, label, style, textStyle, children }) => {
  const resolved: Tone = tone ?? (status ? toneForStatus(status) : 'neutral');
  const color = toneColor[resolved];
  return (
    <View
      style={[
        { backgroundColor: `${color}26`, paddingVertical: 2, paddingHorizontal: 8, borderRadius: 9999, alignSelf: 'flex-start' },
        style,
      ]}
    >
      <Text style={[{ color, fontSize: 11, fontWeight: '600' }, textStyle]}>{children ?? label ?? status}</Text>
    </View>
  );
};
