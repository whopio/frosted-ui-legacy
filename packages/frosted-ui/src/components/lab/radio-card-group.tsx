'use client';

import * as RadioCardGroupPrimitive from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import * as React from 'react';
import {
  extractMarginProps,
  withBreakpoints,
  withMarginProps,
} from '../../helpers';

import type {
  GetPropDefTypes,
  MarginProps,
  PropsWithoutRefOrColor,
} from '../../helpers';
import { radioCardGroupPropDefs } from './radio-card-group.props';

type RadioCardGroupElement = React.ElementRef<
  typeof RadioCardGroupPrimitive.Root
>;
type RadioCardGroupOwnProps = GetPropDefTypes<typeof radioCardGroupPropDefs>;
interface RadioCardGroupRootProps
  extends PropsWithoutRefOrColor<typeof RadioCardGroupPrimitive.Root>,
    MarginProps,
    RadioCardGroupOwnProps {}
const RadioCardGroupRoot = React.forwardRef<
  RadioCardGroupElement,
  RadioCardGroupRootProps
>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = radioCardGroupPropDefs.size.default,
    variant = radioCardGroupPropDefs.variant.default,
    color = radioCardGroupPropDefs.color.default,
    highContrast = radioCardGroupPropDefs.highContrast.default,
    ...rootProps
  } = marginRest;
  return (
    <RadioCardGroupPrimitive.Root
      data-accent-color={color}
      {...rootProps}
      ref={forwardedRef}
      className={classNames(
        'rt-RadioCardGroupRoot',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps),
      )}
    />
  );
});
RadioCardGroupRoot.displayName = 'RadioCardGroupRoot';

type RadioCardGroupItemElement = React.ElementRef<
  typeof RadioCardGroupPrimitive.Item
>;
interface RadioCardGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioCardGroupPrimitive.Item>,
    MarginProps {}
const RadioCardGroupItem = React.forwardRef<
  RadioCardGroupItemElement,
  RadioCardGroupItemProps
>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, style, ...itemProps } = marginRest;
  return (
    <div
      className={classNames(
        'rt-RadioCardGroupItem',
        className,
        withMarginProps(marginProps),
      )}
      style={style}
    >
      <RadioCardGroupPrimitive.Item
        {...itemProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-RadioCardGroupButton')}
      ></RadioCardGroupPrimitive.Item>
    </div>
  );
});
RadioCardGroupItem.displayName = 'RadioCardGroupItem';

const RadioCardGroup = Object.assign(
  {},
  {
    Root: RadioCardGroupRoot,
    Item: RadioCardGroupItem,
  },
);

export { RadioCardGroup, RadioCardGroupItem, RadioCardGroupRoot };
export type { RadioCardGroupItemProps, RadioCardGroupRootProps };
