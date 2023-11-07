import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import {
  Avatar,
  Flex,
  RadioCardGroup,
  Strong,
  Text,
} from '../../../src/components';
import { radioCardGroupPropDefs } from '../../../src/components/lab/radio-card-group.props';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Lab/RadioCardGroup',
  component: RadioCardGroup.Root,
  args: {
    disabled: false,
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof RadioCardGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    size: radioCardGroupPropDefs.size.default,
    color: radioCardGroupPropDefs.color.default,
    variant: radioCardGroupPropDefs.variant.default,
    highContrast: radioCardGroupPropDefs.highContrast.default,
  },
  render: (args) => (
    <RadioCardGroup.Root defaultValue="1" {...args}>
      <Flex gap="2" direction="column">
        <RadioCardGroup.Item value="1" style={{ width: '100%' }}>
          <Flex align="center" gap="3" direction="row">
            <Avatar size="4" fallback="1" />
            <Flex direction="column">
              <Text as="p">
                <Strong>Option one</Strong>
              </Text>
              <Text as="p">Description</Text>
            </Flex>
          </Flex>
        </RadioCardGroup.Item>
        <RadioCardGroup.Item value="2" style={{ width: '100%' }}>
          <Flex align="center" gap="3" direction="row">
            <Avatar size="4" fallback="2" />
            <Flex direction="column">
              <Text as="p">
                <Strong>Option two</Strong>
              </Text>
              <Text as="p">Description</Text>
            </Flex>
          </Flex>
        </RadioCardGroup.Item>
        <RadioCardGroup.Item value="3" style={{ width: '100%' }}>
          <Flex align="center" gap="3" direction="row">
            <Avatar size="4" fallback="3" />
            <Flex direction="column">
              <Text as="p">
                <Strong>Option three</Strong>
              </Text>
              <Text as="p">Description</Text>
            </Flex>
          </Flex>
        </RadioCardGroup.Item>
      </Flex>
    </RadioCardGroup.Root>
  ),
};

// export const Size: Story = {
//   render: (args) => (
//     <Flex align="center" gap="2">
//       <RadioCardGroup.Root {...args} size="1" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} size="2" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} size="3" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>
//     </Flex>
//   ),
// };

// export const Variant: Story = {
//   render: (args) => (
//     <Flex gap="2">
//       <Flex direction="column" asChild gap="2">
//         <RadioCardGroup.Root {...args} variant="surface" defaultValue="1">
//           <RadioCardGroup.Item value="1" />
//           <RadioCardGroup.Item value="2" />
//         </RadioCardGroup.Root>
//       </Flex>

//       <Flex direction="column" asChild gap="2">
//         <RadioCardGroup.Root {...args} variant="classic" defaultValue="1">
//           <RadioCardGroup.Item value="1" />
//           <RadioCardGroup.Item value="2" />
//         </RadioCardGroup.Root>
//       </Flex>

//       <Flex direction="column" asChild gap="2">
//         <RadioCardGroup.Root {...args} variant="soft" defaultValue="1">
//           <RadioCardGroup.Item value="1" />
//           <RadioCardGroup.Item value="2" />
//         </RadioCardGroup.Root>
//       </Flex>
//     </Flex>
//   ),
// };

// export const Color: Story = {
//   render: (args) => (
//     <Flex gap="2">
//       <RadioCardGroup.Root {...args} color="indigo" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} color="cyan" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} color="orange" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} color="crimson" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>
//     </Flex>
//   ),
// };

// export const HighContrast: Story = {
//   name: 'High Contrast',
//   render: (args) => (
//     <Grid rows="2" gap="2" display="inline-grid" flow="column">
//       <RadioCardGroup.Root {...args} color="indigo" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root
//         {...args}
//         color="indigo"
//         defaultValue="1"
//         highContrast
//       >
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} color="cyan" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} color="cyan" defaultValue="1" highContrast>
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} color="orange" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root
//         {...args}
//         color="orange"
//         defaultValue="1"
//         highContrast
//       >
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} color="crimson" defaultValue="1">
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root
//         {...args}
//         color="crimson"
//         defaultValue="1"
//         highContrast
//       >
//         <RadioCardGroup.Item value="1" />
//       </RadioCardGroup.Root>
//     </Grid>
//   ),
// };

// export const Alignment: Story = {
//   name: 'Alignment with text',
//   render: (args) => (
//     <Flex direction="column" gap="3">
//       <Text mb="3">
//         Composing <Code>RadioCardGroup</Code> within <Code>Text</Code>{' '}
//         automatically centers it with the first line of text.
//       </Text>
//       <RadioCardGroup.Root {...args} size="1" defaultValue="1">
//         <Text as="label" size="2">
//           <Flex gap="2">
//             <RadioCardGroup.Item value="1" /> Default
//           </Flex>
//         </Text>

//         <Text as="label" size="2">
//           <Flex gap="2">
//             <RadioCardGroup.Item value="2" /> Compact
//           </Flex>
//         </Text>
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} size="2" defaultValue="1">
//         <Text as="label" size="3">
//           <Flex gap="2">
//             <RadioCardGroup.Item value="1" /> Default
//           </Flex>
//         </Text>

//         <Text as="label" size="3">
//           <Flex gap="2">
//             <RadioCardGroup.Item value="2" /> Compact
//           </Flex>
//         </Text>
//       </RadioCardGroup.Root>

//       <RadioCardGroup.Root {...args} size="3" defaultValue="1">
//         <Text as="label" size="4">
//           <Flex gap="2">
//             <RadioCardGroup.Item value="1" /> Default
//           </Flex>
//         </Text>

//         <Text as="label" size="4">
//           <Flex gap="2">
//             <RadioCardGroup.Item value="2" /> Compact
//           </Flex>
//         </Text>
//       </RadioCardGroup.Root>
//     </Flex>
//   ),
// };
