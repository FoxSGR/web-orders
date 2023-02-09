import {
  ComponentType,
  componentTypeConfigs,
  OrnamentType,
} from '@web-orders/api-interfaces';
import { WOIconItem } from '../common';

interface ShoeComponentConstants {
  types: {
    [key in ComponentType]: WOIconItem;
  };
  ornamentTypes: {
    [key in OrnamentType]: WOIconItem;
  };
}

export const shoeComponentConstants: ShoeComponentConstants = {
  types: {} as any,
  ornamentTypes: {
    zip: {
      icon: 'ellipsis-vertical',
      label: 'str.shoeComponent.types.zip.label',
    },
    buckle: {
      icon: 'bandage-outline',
      label: 'str.shoeComponent.types.buckle.label',
    },
  },
};

Object.entries(componentTypeConfigs).forEach(
  ([key, config]) =>
    (shoeComponentConstants.types[key] = {
      label: config.label,
      icon: config.icon,
    }),
);
