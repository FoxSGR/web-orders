import { IColor } from '../../color';
import { IShoeComponent } from '../../shoe-component';
import { IShoeModel } from '../shoe-model.types';

export interface IShoeModelComponent {
  sort: number;
  model?: IShoeModel;
  component: IShoeComponent;
  amount?: number;
  price?: number;
  color?: IColor;
}
