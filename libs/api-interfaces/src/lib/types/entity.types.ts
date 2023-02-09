export type Id = number;

export interface IEntityDTO {
  id?: Id;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
