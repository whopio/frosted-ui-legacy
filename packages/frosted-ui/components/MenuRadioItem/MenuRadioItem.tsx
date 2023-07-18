import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu';
import type * as Radix from '@radix-ui/react-primitive';
import { forwardRef } from 'react';
import { cn } from '../../lib/classnames';
import { Icon } from '../Icon';
import { MenuSize } from '../Menu';

export const MenuRadioItem = forwardRef<
  React.ElementRef<typeof RadioItem>,
  Radix.ComponentPropsWithoutRef<typeof RadioItem> & { size?: MenuSize }
>(({ children, size = 'sm', className, ...props }, forwardedRef) => {
  return (
    <RadioItem
      ref={forwardedRef}
      className={cn(
        'text-subtitle3 mx-1 flex items-center rounded pl-[34px] pr-2 transition',
        'focus:bg-whop-hover cursor-pointer select-none outline-none focus:outline-none',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        {
          'h-8': size === 'sm',
          'h-10': size === 'md',
        },
        className,
      )}
      {...props}
    >
      {children}
      <ItemIndicator className="absolute left-3 text-sm">
        <Icon icon={faCheck} />
      </ItemIndicator>
    </RadioItem>
  );
});

MenuRadioItem.displayName = 'MenuRadioItem';
