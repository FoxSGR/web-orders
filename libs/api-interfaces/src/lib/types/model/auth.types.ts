import { IUserDTO } from './user.types';

export interface IAuthResponse {
  token: string;
  user: IUserDTO;
}
