import React from 'react';
import { Switch as RNSwitch, Text, View, ViewStyle } from 'react-native';
import { theme } from '../theme';

export interface SwitchProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
}

export const Switch: React.FC<SwitchProps> = ({ label, value, onValueChange, style }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, style]}>
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ true: theme.colors.brand.primary, false: theme.colors.neutral[300] }}
      thumbColor={theme.colors.brand.white}
    />
    {label && <Text style={{ fontSize: 14, color: theme.colors.neutral[700] }}>{label}</Text>}
  </View>
);
