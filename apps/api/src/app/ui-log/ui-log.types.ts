import type { IEntity } from '../shared/entity';

/**
 * Type of log.
 */
export const uiLogTypes = ['info', 'warning', 'error'] as const;

export type UILogType = typeof uiLogTypes[number];

export interface IUILog extends IEntity {
  message: string;
  stack: string;
  type: UILogType;
}
