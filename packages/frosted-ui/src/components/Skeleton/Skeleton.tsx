import React from 'react';
import { cn } from '../../lib/classnames';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('fui-Skeleton', className)} {...props} />;
}

export { Skeleton };
