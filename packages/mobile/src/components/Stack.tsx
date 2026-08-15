import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from '@airwaste/design-tokens';

export interface StackProps {
  direction?: 'row' | 'column';
  gap?: keyof typeof spacing;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  style?: ViewStyle;
  children: React.ReactNode;
}

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
} as const;

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
} as const;

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  style,
  children,
}) => (
  <View
    style={[
      {
        flexDirection: direction,
        gap: spacing[gap],
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
      },
      style,
    ]}
  >
    {children}
  </View>
);

export const VStack = (props: StackProps) => <Stack {...props} direction="column" />;
export const HStack = (props: StackProps) => <Stack {...props} direction="row" />;
