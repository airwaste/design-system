import React from 'react';
import { Switch as RNSwitch, Text, View } from 'react-native';
import { cn } from '../lib/utils';

export interface SwitchProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: object;
  className?: string;
  textClassName?: string;
}

export const Switch: React.FC<SwitchProps> = ({ label, value, onValueChange, disabled, style, className, textClassName }) => (
  <View className={cn('flex-row items-center gap-2', className)} style={style}>
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ true: '#15803D', false: '#CBD5E1' }}
      thumbColor="#FFFFFF"
    />
    {label && <Text className={cn('text-sm text-foreground', textClassName)}>{label}</Text>}
  </View>
);
