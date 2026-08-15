import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';
import { toneForStatus, type Tone } from '../tokens';
import { toneColor } from '../theme';

export interface AlertProps {
  tone?: Tone;
  status?: string;
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ tone, status, title, style, textStyle, children }) => {
  const resolved: Tone = tone ?? (status ? toneForStatus(status) : 'info');
  const color = toneColor[resolved];
  return (
    <View
      style={[
        { backgroundColor: `${color}1A`, borderWidth: 1, borderColor: `${color}4D`, borderRadius: 8, padding: 12 },
        style,
      ]}
    >
      {title && <Text style={[{ fontWeight: '600', color, marginBottom: children ? 4 : 0 }, textStyle]}>{title}</Text>}
      {children && <Text style={[{ fontSize: 13, color }, textStyle]}>{children}</Text>}
    </View>
  );
};
