import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const customWhopTheme = create({
  base: 'light',
  brandTitle: 'Whop Storybook',
  brandUrl: 'https://whop.com',
  brandImage: 'https://i.imgur.com/5xPi7Gj.png',

  // Base colors
  colorPrimary: '#ff6243',
  colorSecondary: '#625bf6',
});

// // UI
// appBg: '#ffffff',
// appContentBg: '#ffffff',
// appBorderColor: '#585C6D',
// appBorderRadius: 4,

// // Text colors
// textColor: '#10162F',
// textInverseColor: '#ffffff',

// // Toolbar default and active colors
// barTextColor: '#9E9E9E',
// barSelectedColor: '#585C6D',
// barBg: '#ffffff',

// // Form colors
// inputBg: '#ffffff',
// inputBorder: '#10162F',
// inputTextColor: '#10162F',
// inputBorderRadius: 2,

addons.setConfig({
  theme: customWhopTheme,
});
