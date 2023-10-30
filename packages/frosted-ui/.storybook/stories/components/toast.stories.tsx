import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { toast as sonnerToast } from 'sonner';
import { Button, Flex, toast } from '../../../src/components';

const ExampleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Lab/Toast',
  component: toast,
  args: {
    // disabled: false,
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variant: Story = {
  args: {},
  render: () => (
    <Flex align="center" gap="4">
      <Button
        variant="classic"
        color="gray"
        onClick={() => toast.neutral('Neutral')}
      >
        Neutral
      </Button>
      <Button variant="classic" color="blue" onClick={() => toast.info('Info')}>
        Info
      </Button>
      <Button
        variant="classic"
        color="green"
        onClick={() => toast.success('Success')}
      >
        Success
      </Button>
      <Button
        variant="classic"
        color="yellow"
        onClick={() => toast.warning('Warning')}
      >
        Warning
      </Button>
      <Button
        variant="classic"
        color="red"
        onClick={() => toast.error('Danger')}
      >
        Danger
      </Button>
    </Flex>
  ),
};

export const Promises: Story = {
  args: {},
  render: () => (
    <Flex align="center" gap="4">
      <Button
        variant="classic"
        color="green"
        onClick={() =>
          toast.promise(
            new Promise<{ currentDate: Date }>((resolve) => {
              setTimeout(
                () =>
                  resolve({
                    currentDate: new Date(),
                  }),
                2000,
              );
            }),
            {
              loading: { title: 'Loading' },
              success: {
                title: (result) =>
                  `Current date: ${result.currentDate.toLocaleDateString()}`,
              },
              error: { title: 'Error' },
            },
          )
        }
      >
        Successfull action
      </Button>
      <Button
        variant="classic"
        color="red"
        onClick={() =>
          toast.promise(
            new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error('Something went wrong'));
              }, 2000);
            }),
            {
              loading: { title: 'Loading' },
              success: { title: 'Success' },
              error: {
                title: (error) => `${error}`,
                description: 'Something went wrong',
                action: {
                  label: 'swag',
                  onClick: () => {},
                },
              },
            },
          )
        }
      >
        Failed action
      </Button>

      <Button
        variant="classic"
        color="red"
        onClick={() =>
          sonnerToast.promise(
            new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error('Something went wrong'));
              }, 2000);
            }),
            {
              loading: 'Loading',
              success: 'Success',
              error: (error) =>
                `${error} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
              action: {
                label: 'swag',
                onClick: () => {},
              },
              dismissible: false,
              important: true,
              cancel: {
                label: 'Cancel',
                onClick: () => {},
              },
              // description:
              //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              finally: () => {
                // alert('SWAG');
              },
            },
          )
        }
      >
        Failed action
      </Button>
    </Flex>
  ),
};
