import React from 'react';
import { cn } from '../../lib/classnames';
import type { IconDefinition } from '../../lib/icon-types';
import type { ColorScheme } from '../../lib/shared-component-types';
import { Icon } from '../Icon';
import { Text } from '../Text';

export type TagColorScheme = Extract<
  ColorScheme,
  'purple' | 'blue' | 'gray' | 'success-green' | 'warning-yellow' | 'error-red'
>;
export const TagColorSchemes: { [key: string]: TagColorScheme } = {
  Purple: 'purple',
  Blue: 'blue',
  Gray: 'gray',
  'Success Green': 'success-green',
  'Warning Yellow': 'warning-yellow',
  'Error Red': 'error-red',
};

export interface TagProps {
  text: string;
  colorScheme?: TagColorScheme;
  rightIcon?: IconDefinition;
  leftIcon?: IconDefinition;
  className?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
}

export const Tag = ({
  text,
  colorScheme = 'purple',
  rightIcon,
  leftIcon,
  className,
  leftIconClassName,
  rightIconClassName,
}: TagProps) => {
  return (
    <Text
      as="div"
      variant="button3"
      data-accent={colorScheme}
      className={cn('fui-Tag', className)}
    >
      {leftIcon && (
        <Icon
          icon={leftIcon}
          className={cn('fui-Tag-icon--left', leftIconClassName)}
        />
      )}
      {text}
      {rightIcon && (
        <Icon
          icon={rightIcon}
          className={cn('fui-Tag-icon--right', rightIconClassName)}
        />
      )}
    </Text>
  );
};
