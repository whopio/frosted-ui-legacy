import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconDefinition } from '../../lib/icon-types';

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
