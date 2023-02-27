import * as sinon from 'sinon';
import { Request, Response } from 'express';
import chai from 'chai';
import LoginModel from '../../../models/login.model';
import LoginService from '../../../services/login.service';
import LoginController from '../../../controllers/login.controller';
import {
  loginMockWithId,
  loginMock,
  loginMockWithToken,
} from '../../mocks/login.mock';
import { token } from '../../../utils/create.token';

const { expect } = chai;

describe('Login Controller', () => {
  const loginModel = new LoginModel();
  const loginService = new LoginService(loginModel);
  const loginController = new LoginController(loginService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('reading a login', () => {
    beforeEach(async () => {
      sinon.stub(loginService, 'readOne').resolves(loginMockWithId);
      sinon.stub(token, 'createToken').returns(loginMockWithToken);
    });

    it('should read a login', async () => {
      req.body = loginMock;
      await loginController.readOneLogin(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(loginMockWithToken)).to.be.true;
    });
  });
});
