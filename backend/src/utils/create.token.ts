import * as Jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';
import { IToken, Token } from '../interfaces/IToken';

export const token = {
  createToken: (login: ILogin): IToken => {
    const secret = process.env.JWT_SECRET || 'secretJWT';

    const options: Jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = Jwt.sign(
      { username: login.username, password: login.password },
      secret,
      options
    );

    return { token } as IToken;
  },

  verifyToken: (token: string): Token => {
    const secret = process.env.JWT_SECRET || 'secretJWT';

    const decoded = Jwt.verify(token, secret) as Token;

    return decoded as Token;
  },
};
