import { ColumnOptions } from 'typeorm';

export const commonColumns: {
  [key: string]: {
    seed: (faker: Faker.FakerStatic) => any;
    column: ColumnOptions;
  };
} = {
  notes: {
    seed: faker =>
      faker.lorem.words(faker.random.arrayElement([0, 3, 12, 20, 32])),
    column: {
      default: '',
      length: 512,
    },
  },
};
