import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './mongo.model';
import { ILogin } from '../interfaces/ILogin';

const loginSchema = new Schema<ILogin>(
  {
    username: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

export default class LoginModel extends MongoModel<ILogin> {
  constructor(model = mongooseCreateModel<ILogin>('login-users', loginSchema)) {
    super(model);
  }
}
