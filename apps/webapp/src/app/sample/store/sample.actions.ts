import { entityActions } from '../../common';
import { sampleStoreConfig } from './sample.config';

export const sampleActions = entityActions(sampleStoreConfig.name);
