import {
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user';

export class EntityBase {
  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

export class OwnedEntity extends EntityBase {
  @ManyToOne(() => User, { cascade: false, nullable: false })
  owner: User;
}
