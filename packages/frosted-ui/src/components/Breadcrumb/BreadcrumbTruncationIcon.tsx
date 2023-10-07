'use client';

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Icon } from '../Icon';

export const BreadcrumbTruncationIcon = () => (
  <Icon
    icon={faEllipsis}
    fontawesomeSize="sm"
    className="fui-BreadcrumbTruncationIcon"
  />
);
