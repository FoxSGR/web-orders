import { IUserDTO } from '@web-orders/api-interfaces';

export interface IAuthResponse {
  token: string;
  user: IUserDTO;
}
