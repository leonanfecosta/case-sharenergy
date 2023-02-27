import { IUser } from '../../interfaces/IUser';

export const userMock: IUser = {
  name: 'John Doe',
  email: 'johndoe@test.com',
  phone: '11911111111',
  address: 'Rua dos Bobos, 0',
  cpf: '111.111.111-11',
};

export const userMockWithId: IUser & { _id: string } = {
  ...userMock,
  _id: '5f9b5b9b9b9b9b9b9b9b9b9b',
}