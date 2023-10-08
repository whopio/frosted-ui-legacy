'use client';

import type * as Radix from '@radix-ui/react-primitive';
import { Range, Root, SliderThumb, Track } from '@radix-ui/react-slider';
import React, { forwardRef } from 'react';

export const Slider = forwardRef<
  React.ElementRef<typeof Root>,
  Radix.ComponentPropsWithoutRef<typeof Root>
>(({ ...props }, forwardedRef) => {
  const value = props.value || props.defaultValue;

  return (
    <Root ref={forwardedRef} className="fui-Slider" {...props}>
      <Track className="fui-Slider-track">
        <Range className="fui-Slider-range" />
      </Track>
      {value?.map((_, i) => (
        <SliderThumb key={i} className="fui-Slider-thumb">
          <div className="fui-Slider-thumb-dot" />
        </SliderThumb>
      ))}
    </Root>
  );
});
