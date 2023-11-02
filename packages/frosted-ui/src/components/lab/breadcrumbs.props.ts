import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2'] as const;

const breadcrumbsPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  color: { ...colorProp, default: 'gray' },
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { breadcrumbsPropDefs };