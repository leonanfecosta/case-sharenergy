import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import LoginModel from '../../../models/login.model';
import { loginMockWithId } from '../../mocks/login.mock';

const { expect } = chai;

describe('Login Model', () => {
  const loginModel = new LoginModel();

  before(async () => {
    sinon.stub(Model, 'findOne').resolves(loginMockWithId);
  });

  after(async () => {
    sinon.restore();
  });

  describe('getting a login', () => {
    it('should get a login', async () => {
      const login = await loginModel.readOneLogin(loginMockWithId.username, loginMockWithId.password);
      expect(login).to.be.eql(loginMockWithId);
    });
  });
});
