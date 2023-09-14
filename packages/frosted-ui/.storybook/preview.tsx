import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import * as React from 'react';
import '../index.css';
import { Toaster } from '../src/components/Toaster';
import { TooltipProvider } from '../src/components/TooltipProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
        <Toaster />
      </TooltipProvider>
    ),
  ],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
