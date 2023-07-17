import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@lib/icon-types';
import React from 'react';

export interface IconProps {
  icon: IconDefinition;
  className?: string;
  size?: FontAwesomeIconProps['size'];
}

export const Icon = ({ icon, size, className }: IconProps) => {
  return (
    <FontAwesomeIcon icon={icon} size={size} className={className} fixedWidth />
  );
};
