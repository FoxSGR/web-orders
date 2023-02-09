import { DeepPartial } from 'typeorm';

export type ResponseFormat = 'full' | 'simple';
export type Promial<T> = Promise<DeepPartial<T>>;
