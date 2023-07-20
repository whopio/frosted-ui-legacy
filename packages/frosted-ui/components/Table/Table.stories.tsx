import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'General/Table',
  component: Table,
  args: {
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {};