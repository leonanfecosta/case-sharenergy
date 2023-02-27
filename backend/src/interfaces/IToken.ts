import { ILogin } from './ILogin';

export interface IToken {
  token: string;
}

export interface Token {
  username: string;
  password: string;
  iat: number;
  exp: number;
}

export interface IUserToken extends ILogin, IToken {}
