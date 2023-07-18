import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Forms/Label',
  component: Label,
  args: {
    variant: 'default',
    children: 'Your first name',
  },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const WithTooltip: Story = {
  args: {
    tooltip: { description: 'There is more info in the tooltip.' },
  },
};
