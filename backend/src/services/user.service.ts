import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalog';
import { IUser, UserSchema } from '../interfaces/IUser';

export default class UserService implements IService<IUser> {
  constructor(private userModel: IModel<IUser>) {}

  public async create(obj: unknown): Promise<IUser> {
    const user = await UserSchema.safeParse(obj);

    if (!user.success) {
      throw user.error;
    }

    const { email, cpf } = user.data;

    const userExists = await this.userModel.readOneUser(email, cpf);

    if (userExists) throw Error(ErrorTypes.EntityAlreadyExists);

    return this.userModel.create(user.data);
  }

  public async read(): Promise<IUser[]> {
    return this.userModel.read();
  }

  public async update(id: string, obj: unknown): Promise<IUser | null> {
    const parsedUser = await UserSchema.safeParse(obj);

    if (!parsedUser.success) throw parsedUser.error;

    const user = await this.userModel.update(id, parsedUser.data);

    if (!user) throw Error(ErrorTypes.EntityNotFound);

    return user;
  }

  public async delete(id: string): Promise<IUser | null> {
    const user = await this.userModel.delete(id);

    if (!user) throw Error(ErrorTypes.EntityNotFound);

    return user;
  }
}
