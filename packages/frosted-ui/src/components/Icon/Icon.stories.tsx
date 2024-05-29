import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'General/Icon',
  component: Icon,
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const CustomClassName: Story = {
  args: {
    className: 'text-whop-field-highlight text-2xl',
  },
};
