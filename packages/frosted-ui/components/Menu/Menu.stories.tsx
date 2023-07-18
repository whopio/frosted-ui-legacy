import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'General/Menu',
  component: Menu,
  args: {
  },
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {};