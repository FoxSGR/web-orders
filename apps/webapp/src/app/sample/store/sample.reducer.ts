import { entityReducer } from '../../common';
import { sampleStoreConfig } from './sample.config';

/**
 * The reducer for sample actions.
 */
export const sampleReducer = entityReducer(sampleStoreConfig);
