'use client';

import {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  MenuContentProps,
} from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { MenuContent } from '../MenuContent';
import { MenuItem, MenuItemProps } from '../MenuItem';
import { MenuRoot } from '../MenuRoot';
import { MenuTrigger } from '../MenuTrigger';

export type MenuProps = {
  children?: React.ReactNode;
  /**Items can either be passed in as children or here in an array of objects.*/
  items?: MenuItemProps[];
  /**This is the element that when clicked will trigger the menu to open.*/
  trigger: React.ReactNode;
  rootProps?: DropdownMenuProps;
  triggerProps?: DropdownMenuTriggerProps;
  contentProps?: MenuContentProps;
};

export const Menu = ({
  trigger,
  children,
  items,
  rootProps,
  triggerProps,
  contentProps,
}: MenuProps) => {
  return (
    <MenuRoot {...rootProps}>
      <MenuTrigger asChild className="outline-none" {...triggerProps}>
        {trigger}
      </MenuTrigger>
      <MenuContent {...contentProps}>
        {(items?.length || 0) > 0
          ? items?.map((item, index) => {
              return <MenuItem key={index} {...item} />;
            })
          : children}
      </MenuContent>
    </MenuRoot>
  );
};
