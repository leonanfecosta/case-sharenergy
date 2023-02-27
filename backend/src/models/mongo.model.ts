import { Model, UpdateQuery, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOneLogin(username: string, password: string): Promise<T | null> {
    return this._model.findOne({ username, password });
  }

  public async readOneUser(email: string, cpf: string): Promise<T | null> {
    return this._model.findOne({$or: [{email}, {cpf}]});
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw Error(ErrorTypes.InvalidMongoId);
    }
    return this._model.findByIdAndUpdate(
      id,
      { ...(obj as UpdateQuery<T>) },
      { new: true }
    );
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw Error(ErrorTypes.InvalidMongoId);
    }
    return this._model.findByIdAndDelete(id);
  }
}
