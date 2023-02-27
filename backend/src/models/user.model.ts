import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './mongo.model';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    cpf: String,
  },
  {
    versionKey: false,
  }
);

export default class UserModel extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel<IUser>('User', userSchema)) {
    super(model);
  }
}
