import { IModel } from '../interfaces/IModel';
import { IServiceLogin } from '../interfaces/IServiceLogin';
import { ErrorTypes } from '../errors/catalog';
import { ILogin } from '../interfaces/ILogin';
import md5 from 'md5';


export default class LoginService implements IServiceLogin<ILogin>{
  constructor(private loginModel: IModel<ILogin>) {}

  public async readOne(username: string, password: string): Promise<ILogin | null> {
    const hashedPassword = md5(password);
    const login = await this.loginModel.readOneLogin(username, hashedPassword);
    if (!login) {
      throw Error(ErrorTypes.NotFound);
    }
    return login;
  }

}