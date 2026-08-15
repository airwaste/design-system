import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';
import { toneForStatus, type Tone } from '@airwaste/design-tokens';
import { toneColor } from '../theme';

export interface StatusPillProps {
  status: string;
  label?: string;
  tone?: Tone;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, label, tone, style, textStyle }) => {
  const resolved: Tone = tone ?? toneForStatus(status);
  const color = toneColor[resolved];
  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: `${color}26`, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 9999, alignSelf: 'flex-start' },
        style,
      ]}
    >
      <View style={{ width: 6, height: 6, borderRadius: 9999, backgroundColor: color }} />
      <Text style={[{ color, fontSize: 12, fontWeight: '600' }, textStyle]}>{label ?? status}</Text>
    </View>
  );
};
