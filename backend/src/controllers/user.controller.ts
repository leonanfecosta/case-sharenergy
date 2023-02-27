import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import { IService } from '../interfaces/IService';

export default class UserController {
  constructor(private userService: IService<IUser>) {}

  public async create(req: Request, res: Response<IUser>): Promise<void> {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }

  public async read(req: Request, res: Response<IUser[]>): Promise<void> {
    const users = await this.userService.read();
    res.status(200).json(users);
  }

  public async update(req: Request, res: Response<IUser | null>): Promise<void> {
    const { id } = req.params;
    const user = await this.userService.update(id, req.body);
    res.status(200).json(user);
  }

  public async delete(req: Request, res: Response<IUser | null>): Promise<void> {
    const { id } = req.params;
    const user = await this.userService.delete(id);
    res.status(200).json(user);
  }

}
