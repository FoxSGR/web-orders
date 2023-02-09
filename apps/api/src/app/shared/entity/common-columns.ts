import { ColumnOptions } from 'typeorm';
import { Faker } from '@faker-js/faker';

export const commonColumns: {
  [key: string]: {
    seed: (faker: Faker) => any;
    column: ColumnOptions;
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
};
