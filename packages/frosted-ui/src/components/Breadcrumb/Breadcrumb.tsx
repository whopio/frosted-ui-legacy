'use client';

import React, { ReactNode, cloneElement } from 'react';
import { cn } from '../../lib/classnames';
import { BreadcrumbTruncationIcon } from './BreadcrumbTruncationIcon';

type BreadcrumbProps = {
  children: ReactNode;
  className?: string;
};

export const Breadcrumb = ({ children, className }: BreadcrumbProps) => {
  const count = React.Children.count(children);

  return (
    <nav className={cn('fui-Breadcrumb', className)}>
      <ul className="fui-Breadcrumb-list">
        {React.Children.map(children, (child, index) => {
          // Adding in the separators
          const needsTruncation = count > 10;
          const isFirst = index === 0 || index === 1;
          const isLast = index === count - 1 || index === count - 2;
          const isHidden = needsTruncation && !isFirst && !isLast;

          if (needsTruncation && index === 1) {
            return (
              <li key={index} className="fui-Breadcrumb-list-item">
                {cloneElement(child as never, {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...((child as any).props || {}),
                })}
                <BreadcrumbTruncationIcon />
              </li>
            );
          }
          return (
            <li
              key={index}
              className={cn('fui-Breadcrumb-list-item', {
                'fui-Breadcrumb-list-item--hidden': isHidden,
              })}
            >
              {child}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
