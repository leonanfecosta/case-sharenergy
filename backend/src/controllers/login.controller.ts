import { Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import { IServiceLogin } from '../interfaces/IServiceLogin';
import { token } from '../utils/create.token';
import { IUserToken } from '../interfaces/IToken';

export default class LoginController {
  constructor(private loginService: IServiceLogin<ILogin>) {}

  public async readOneLogin(req: Request, res: Response<ILogin>): Promise<void> {
    const { username, password } = req.body;
    const login = await this.loginService.readOne(username, password) as ILogin;
    const generateToken = token.createToken(login as ILogin);
    const response = {
      username: login.username,
      password: login.password,
      token: generateToken.token,
    };
    res.status(200).json(response as IUserToken);
  }
}