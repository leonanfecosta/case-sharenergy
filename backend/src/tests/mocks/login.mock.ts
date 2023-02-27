import { ILogin } from "../../interfaces/ILogin";

export const loginMock: ILogin = {
  username: 'johndoe',
  password: '123456',
}

export const loginMockWithId: ILogin & { _id: string } = {
  ...loginMock,
  _id: '5f9b5b9b9b9b9b9b9b9b9b9b',
}

export const loginMockWithToken: ILogin & { token: string } = {
  ...loginMock,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huZG9lIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1MTYyMzkwMjJ9.bKOcXh3h2uSOsnmQ8geodxc8o6_Qqhzet7qOYFuUljg',
};