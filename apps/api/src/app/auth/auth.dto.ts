import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  password: string;
}
