import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import * as React from 'react';
import { Toaster } from '../src/components/Toaster';
import { TooltipProvider } from '../src/components/TooltipProvider';
import '../src/index.css';
import '../src/themes/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        {/* <style>
          {`body, html {
            background: var(--gray-50);
          }`}
        </style> */}
        <div
          data-theme="light"
          //  style={{ background: 'var(--gray-50)' }}
        >
          <Story />
          <Toaster />
        </div>
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
    options: {
      storySort: {
        order: ['Design System', 'General', 'Forms'],
      },
    },
  },
};

export default preview;
