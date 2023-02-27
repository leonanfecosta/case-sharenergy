import * as sinon from 'sinon';
import chai from 'chai';
import LoginModel from '../../../models/login.model';
import LoginService from '../../../services/login.service';
import { ZodError } from 'zod';
import { loginMockWithId } from '../../mocks/login.mock';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('Login Service', () => {
  const loginModel = new LoginModel();
  const loginService = new LoginService(loginModel);

  before(async () => {
    sinon
      .stub(loginModel, 'readOneLogin')
      .onCall(0)
      .resolves(loginMockWithId)
      .onCall(1)
      .resolves(null);
  });

  after(async () => {
    sinon.restore();
  });

  describe('reading a login', () => {
    it('should read a login', async () => {
      const login = await loginService.readOne(
        loginMockWithId.username,
        loginMockWithId.password
      );
      expect(login).to.be.eql(loginMockWithId);
    });

    it('should throw a NotFound error', async () => {
      let error: any;
      try {
        await loginService.readOne('username', 'password');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.NotFound);
    });
  });
});
