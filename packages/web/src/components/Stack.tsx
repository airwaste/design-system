import React from 'react';
import { spacing } from '@airwaste/design-tokens';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: keyof typeof spacing;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  className = '',
  style,
  children,
  ...rest
}) => (
  <div
    className={[
      direction === 'row' ? 'flex flex-row' : 'flex flex-col',
      alignMap[align],
      justifyMap[justify],
      className,
    ].join(' ')}
    style={{ gap: `${spacing[gap]}px`, ...style }}
    {...rest}
  >
    {children}
  </div>
);

export const VStack = (props: StackProps) => <Stack {...props} direction="column" />;
export const HStack = (props: StackProps) => <Stack {...props} direction="row" />;
