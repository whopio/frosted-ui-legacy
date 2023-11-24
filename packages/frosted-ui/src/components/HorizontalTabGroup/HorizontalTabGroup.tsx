'use client';

import { Tab } from '@headlessui/react';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { cn } from '../../lib/classnames';
import { HorizontalTabContext } from '../HorizontalTabGroupContext';
import { HorizontalTabList } from '../HorizontalTabList';
import {
  HorizontalTabItemProps,
  HorizontalTabListItem,
  HorizontalTabSize,
} from '../HorizontalTabListItem';

export const HorizontalTabSizes: { [key: string]: HorizontalTabSize } = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
};

export interface HorizontalTabProps extends PropsWithChildren {
  defaultTab?: number;
  items?: HorizontalTabItemProps[];
  size?: HorizontalTabSize;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  wrapperClassName?: string;
}

const usePrevious = (value: number) => {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const HorizontalTabLayoutIdContext = React.createContext<
  string | undefined
>(undefined);

export const useHorizontalTabLayoutId = () => {
  return React.useContext(HorizontalTabLayoutIdContext);
};

/** Pass `defaultTab` as the index of the tab you want to open by default. */
export const HorizontalTabGroup = ({
  children,
  defaultTab,
  items,
  selectedIndex,
  setSelectedIndex,
  size = 'md',
  wrapperClassName,
}: HorizontalTabProps) => {
  const layoutId = React.useId();
  const previousIndex = usePrevious(selectedIndex);

  return (
    <HorizontalTabContext.Provider value={{ selectedIndex, previousIndex }}>
      <Tab.Group
        defaultIndex={defaultTab}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <HorizontalTabLayoutIdContext.Provider value={layoutId}>
          {items && (
            <HorizontalTabList className={cn(wrapperClassName)}>
              {items.map((item, index) => (
                <HorizontalTabListItem
                  key={item?.label || index}
                  size={size}
                  {...item}
                />
              ))}
            </HorizontalTabList>
          )}
          {children}
        </HorizontalTabLayoutIdContext.Provider>
      </Tab.Group>
    </HorizontalTabContext.Provider>
  );
};
