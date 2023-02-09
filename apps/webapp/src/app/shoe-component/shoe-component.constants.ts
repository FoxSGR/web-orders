import { ComponentType, OrnamentType } from '@web-orders/api-interfaces';
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
  types: {
    leather: {
      icon: 'layers',
      label: 'str.shoeComponent.types.leather.label',
    },
    lining: {
      icon: 'unlink-outline',
      label: 'str.shoeComponent.types.lining.label',
    },
    heel: {
      icon: 'swap-vertical',
      label: 'str.shoeComponent.types.heel.label',
    },
    sole: {
      icon: 'footsteps',
      label: 'str.shoeComponent.types.sole.label',
    },
    last: {
      icon: 'file-tray',
      label: 'str.shoeComponent.types.last.label',
    },
    finishInsole: {
      icon: 'phone-portrait',
      label: 'str.shoeComponent.types.finishInsole.label',
    },
    productionInsole: {
      icon: 'phone-landscape',
      label: 'str.shoeComponent.types.productionInsole.label',
    },
    laces: {
      icon: 'options',
      label: 'str.shoeComponent.types.laces.label',
    },
    ornament: {
      icon: 'add',
      label: 'str.shoeComponent.types.ornament.label',
    },
    frontlet: {
      icon: 'chevron-forward',
      label: 'str.shoeComponent.types.frontlet.label',
    },
    backCounter: {
      icon: 'chevron-back',
      label: 'str.shoeComponent.types.backCounter.label',
    },
  },
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
