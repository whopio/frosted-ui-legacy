'use client';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Icon } from '../Icon';

export const BreadcrumbSeparator = () => (
  <Icon
    icon={faChevronRight}
    fontawesomeSize="sm"
    className="fui-BreadcrumbSeparator"
  />
);
