import { IsArray, IsInt } from 'class-validator';

export class Page<T> {
  @IsInt()
  total: number;

  @IsInt()
  offset: number;

  @IsInt()
  size: number;

  @IsArray()
  items: T[];
}
