'use client';

import {
  Indicator,
  CheckboxProps as RadixCheckboxProps,
  Root,
} from '@radix-ui/react-checkbox';
import { Root as Label } from '@radix-ui/react-label';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useId } from 'react';
import { cn } from '../../lib/classnames';
import { ColorScheme } from '../../lib/shared-component-types';
import { Text } from '../Text';

export type CheckboxColorScheme = Extract<ColorScheme, 'brand' | 'black'>;
export const CheckboxColorSchemes: { [key: string]: CheckboxColorScheme } = {
  Brand: 'brand',
  Black: 'black',
};

export interface CheckboxProps {
  colorScheme?: CheckboxColorScheme;
  wrapperClassName?: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  /** Label to the left of the checkbox */
  label?: string;
  /** Remove the check, path animation */
  removeMotion?: boolean;
  /** This is the intrinsic id prop, and will also link the label to the checkbox when clicking */
  id?: string;
}

export const Checkbox = ({
  colorScheme = 'brand',
  label,
  removeMotion = false,
  wrapperClassName,
  className,
  iconClassName,
  labelClassName,
  defaultChecked,
  checked,
  onCheckedChange,
  isDisabled = false,
  isRequired = false,
  name,
  value,
  id,
}: CheckboxProps & Omit<RadixCheckboxProps, 'disabled' | 'id'>) => {
  const defaultId = useId();

  console.log({
    checked,
    defaultChecked,
    shouldShow: checked === true || defaultChecked === true,
  });
  return (
    <div className={cn('fui-Checkbox', wrapperClassName)}>
      <Root
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={isDisabled}
        required={isRequired}
        name={name}
        value={value}
        data-accent={colorScheme}
        className={cn('fui-Checkbox-root', className)}
        id={id || defaultId}
      >
        <Indicator className={cn('fui-Checkbox-indicator', iconClassName)}>
          {(checked === 'indeterminate' ||
            defaultChecked === 'indeterminate') && <IndeterminateIcon />}
          {checked !== 'indeterminate' &&
            (removeMotion ? <CheckIcon /> : <MotionCheckIcon />)}
        </Indicator>
      </Root>
      {label && (
        <Label htmlFor={id || defaultId} asChild>
          <Text
            as="label"
            variant="body2"
            className={cn('fui-Checkbox-label', labelClassName)}
          >
            {label}
          </Text>
        </Label>
      )}
    </div>
  );
};

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('fui-Checkbox-icon', className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 8L6.83333 10.5L11.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IndeterminateIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('fui-Checkbox-icon', className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8H11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
};
const MotionCheckIcon = ({ className }: { className?: string }) => {
  return (
    <AnimatePresence>
      <svg
        className={cn('fui-Checkbox-icon', className)}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M4.5 8L6.83333 10.5L11.5 5.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
          }}
          transition={{ type: 'spring', duration: 0.3 }}
          exit={{ pathLength: 0 }}
        />
      </svg>
    </AnimatePresence>
  );
};
