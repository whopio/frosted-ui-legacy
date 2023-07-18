import type { Meta, StoryObj } from '@storybook/react';
import { TextButton } from './TextButton';

const meta: Meta<typeof TextButton> = {
  title: 'General/TextButton',
  component: TextButton,
  args: {
    variant: 'arrow',
    colorScheme: 'dark-gray',
    size: 'md',
    children: 'Click me',
    onClick: () => alert('Clicked!'),
  },
};
export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {};
