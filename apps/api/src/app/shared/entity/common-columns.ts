import { ColumnOptions } from 'typeorm';
import { ColumnEmbeddedOptions } from 'typeorm/decorator/options/ColumnEmbeddedOptions';
import { Faker } from '@faker-js/faker';

import { OwnedEntity } from './entity';

export const commonColumns: {
  [key: string]: {
    seed: (faker: Faker) => any;
    column: ColumnOptions | ColumnEmbeddedOptions;
  };
} = {
  notes: {
    seed: faker =>
      faker.lorem.words(faker.helpers.arrayElement([0, 3, 12, 20, 32])),
    column: {
      default: '',
      length: 512,
    },
  },
  ownedBase: {
    seed: () => ({ owner: { id: 1 } }),
    column: {
      prefix: '',
    },
  },
};
