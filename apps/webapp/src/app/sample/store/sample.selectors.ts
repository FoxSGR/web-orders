import { entitySelectors } from '../../common/store/entity.selectors';
import { sampleStoreConfig } from './sample.config';
import { ShoeSample } from '../../common';

export const sampleSelectors = entitySelectors<ShoeSample>(
  sampleStoreConfig.name,
);
