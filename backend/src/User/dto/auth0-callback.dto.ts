import { IsString, IsOptional } from 'class-validator';

export class Auth0CallbackDto {
  @IsString()
  auth0Id: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  accessToken: string;

  @IsString()
  idToken: string;
}
