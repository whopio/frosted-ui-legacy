'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';
import { cn } from '../../lib/classnames';

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    isIndeterminate?: boolean;
  }
>(({ className, value, isIndeterminate, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('fui-Progress', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn('fui-Progress-indicator')}
      style={React.useMemo(
        () => ({
          transform: `translateX(-${
            100 - (isIndeterminate ? 100 : value || 0)
          }%)`,
        }),
        [value],
      )}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;
