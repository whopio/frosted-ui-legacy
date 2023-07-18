'use client';

import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faExclamationCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import type * as Radix from '@radix-ui/react-primitive';
import {
  Content,
  Group,
  Icon as IconPrimitive,
  Item,
  ItemIndicator,
  ItemText,
  Label as LabelPrimitive,
  SelectGroupProps as RadixSelectGroupProps,
  SelectItemProps as RadixSelectItemProps,
  SelectProps as RadixSelectProps,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  SelectContentProps,
  SelectIconProps,
  SelectPortalProps,
  SelectTriggerProps,
  SelectValueProps,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import React, { forwardRef } from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import { Size } from '../../lib/shared-component-types';
import { Icon } from '../Icon';
import { Label, LabelProps } from '../Label';

export type SelectSize = Extract<Size, 'sm' | 'md' | 'lg'>;
export const SelectSizes: { [key: string]: SelectSize } = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
};

export type SelectItemProps = {
  isDisabled?: boolean;
  className?: string;
} & Omit<RadixSelectItemProps, 'disabled'>;

// TODO: Move this to a separate file for barrel imports
export const SelectItem = forwardRef<
  React.ElementRef<typeof Item>,
  Radix.ComponentPropsWithoutRef<typeof Item> & SelectItemProps
>(({ children, textValue, isDisabled, className, ...props }, forwardedRef) => {
  return (
    <Item
      className={cn(
        'text-subtitle3 mx-1 flex h-8 items-center rounded pl-[34px] pr-2 transition',
        'focus:bg-whop-hover cursor-pointer select-none outline-none focus:outline-none',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      disabled={isDisabled}
      {...props}
      ref={forwardedRef}
    >
      <ItemIndicator className="absolute left-3 text-sm">
        <Icon icon={faCheck} />
      </ItemIndicator>
      <span className="truncate">
        <ItemText>{textValue || children}</ItemText>
      </span>
    </Item>
  );
});

export type SelectGroupProps = {
  label?: string;
  className?: string;
  separatorTop?: boolean;
  separatorBottom?: boolean;
} & RadixSelectGroupProps;

// TODO: Move this to a separate file for barrel imports
export const SelectGroup = forwardRef<
  React.ElementRef<typeof Group>,
  Radix.ComponentPropsWithoutRef<typeof Group> & SelectGroupProps
>(
  (
    {
      children,
      label,
      className,
      separatorTop = true,
      separatorBottom = false,
    },
    ref,
  ) => {
    return (
      <>
        {separatorTop && <SelectSeparator className="mt-1" />}
        <Group ref={ref} className={cn('mt-1', className)}>
          {label && (
            <LabelPrimitive className="text-overline4 text-whop-dark-gray mt-3 ml-3 mb-1 uppercase">
              {label}
            </LabelPrimitive>
          )}
          {children}
        </Group>
        {separatorBottom && <SelectSeparator className="my-1" />}
      </>
    );
  },
);

// TODO: Move this to a separate file for barrel imports
const SelectSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  Radix.ComponentPropsWithoutRef<typeof Separator> & { className?: string }
>(({ className }, ref) => {
  return (
    <Separator ref={ref} className={cn('bg-whop-stroke h-px', className)} />
  );
});

export type SelectProps = {
  label?: LabelProps;
  size?: SelectSize;
  isDisabled?: boolean;
  isRequired?: boolean;
  helpMessage?: string;
  errorMessage?: string;
  messageIcon?: boolean;
  leftIcon?: IconDefinition;
  wrapperClassName?: string;
  className?: string;
  contentClassName?: string;
  items?: SelectItemProps[];
} & Omit<RadixSelectProps, 'dir' | 'disabled' | 'required'> &
  Omit<SelectTriggerProps, 'asChild'> &
  Omit<SelectValueProps, 'asChild'> &
  Omit<SelectIconProps, 'asChild'> &
  SelectPortalProps &
  Omit<SelectContentProps, 'asChild'>;

export const Select = forwardRef<
  React.ElementRef<typeof Root>,
  Radix.ComponentPropsWithoutRef<typeof Root> & SelectProps
>(
  (
    {
      label,
      children,
      items,
      size = 'md',
      helpMessage,
      errorMessage,
      messageIcon = true,
      leftIcon,
      isDisabled,
      isRequired,
      value,
      onValueChange,
      defaultValue,
      name,
      open,
      onOpenChange,
      defaultOpen,
      placeholder,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      position = 'popper',
      side,
      sideOffset,
      align,
      alignOffset,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      arrowPadding,
      sticky,
      hideWhenDetached,
      wrapperClassName,
      className,
      contentClassName,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <div className={cn('relative h-fit w-full', wrapperClassName)}>
        {label && <Label wrapperClassName="mb-2" {...label} />}
        <Root
          dir="ltr"
          name={name}
          disabled={isDisabled}
          required={isRequired}
          defaultValue={defaultValue}
          value={value}
          onValueChange={onValueChange}
          onChange={onValueChange}
          defaultOpen={defaultOpen}
          open={open}
          onOpenChange={onOpenChange}
          {...props}
        >
          <Trigger
            className={cn(
              'data-[placeholder]:text-whop-dark-gray/[50%] bg-whop-background text-whop-black text-text1 inline-flex w-full min-w-[244px] select-none items-center justify-between rounded-md pl-3 shadow-sm',
              'border-whop-stroke-dark focus:border-whop-field-highlight focus:ring-whop-field-highlight/30 border outline-none transition focus:outline-none focus:ring',
              'data-[disabled]:bg-whop-hover data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75',
              className,
              {
                'h-8': size === 'sm',
                'h-10': size === 'md',
                'h-12': size === 'lg',
              },
              {
                'pl-[38px]': !!leftIcon,
              },
              {
                '!border-whop-error-red focus:!ring-whop-error-red/30':
                  !!errorMessage,
              },
            )}
            ref={forwardedRef}
          >
            {leftIcon && (
              <IconPrimitive
                className={cn(
                  'text-whop-dark-gray/[75%] pointer-events-none absolute left-3',
                  {
                    'text-[15px]': size === 'sm',
                    'text-base': size === 'md' || size === 'lg',
                  },
                )}
              >
                <Icon icon={leftIcon} />
              </IconPrimitive>
            )}
            <span className="truncate">
              <Value placeholder={placeholder} aria-label={value} />
            </span>
            <IconPrimitive>
              <Icon
                icon={faChevronDown}
                className="text-whop-black pointer-events-none h-3.5 pr-3 text-sm"
              />
            </IconPrimitive>
          </Trigger>
          <Content
            onCloseAutoFocus={onCloseAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            position={position}
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            arrowPadding={arrowPadding}
            sticky={sticky}
            hideWhenDetached={hideWhenDetached}
            className={cn(
              'border-whop-stroke-dark bg-whop-background z-50 mt-1.5 max-h-[var(--radix-select-content-available-height)] w-[244px] overflow-auto rounded-md border py-1 shadow-lg focus:outline-none',
              contentClassName,
            )}
          >
            <ScrollUpButton className="flex justify-center">
              <Icon
                icon={faChevronUp}
                className="text-whop-dark-gray h-3.5 text-sm"
              />
            </ScrollUpButton>
            <Viewport>
              {items
                ? items.map((item) => <SelectItem key={item.value} {...item} />)
                : children}
            </Viewport>
            <ScrollDownButton className="flex justify-center">
              <Icon
                icon={faChevronDown}
                className="text-whop-dark-gray h-3.5 text-sm"
              />
            </ScrollDownButton>
          </Content>
        </Root>
        {(errorMessage || helpMessage) && (
          <div
            className={cn(
              'mt-2 flex items-start gap-1 text-xs',
              { 'opacity-75': isDisabled },
              {
                'text-whop-error-red ': !!errorMessage,
                'text-whop-dark-gray': !!helpMessage,
              },
            )}
          >
            {messageIcon && (
              <Icon
                icon={helpMessage ? faInfoCircle : faExclamationCircle}
                className="mt-px h-3"
              />
            )}
            <div className="text-text5 flex-wrap">
              {errorMessage || helpMessage}
            </div>
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
SelectGroup.displayName = 'SelectGroup';
SelectItem.displayName = 'SelectItem';
SelectSeparator.displayName = 'SelectSeparator';
