import * as sinon from 'sinon';
import { Request, Response } from 'express';
import chai from 'chai';
import UserModel from '../../../models/user.model';
import UserService from '../../../services/user.service';
import UserController from '../../../controllers/user.controller';
import { userMockWithId, userMock } from '../../mocks/user.mock';

const { expect } = chai;

describe('User Controller', () => {
  const userModel = new UserModel();
  const userService = new UserService(userModel);
  const userController = new UserController(userService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('creating a user', () => {
    beforeEach(async () => {
      sinon.stub(userService, 'create').resolves(userMockWithId);
    });

    it('should create a user', async () => {
      req.body = userMock;
      await userController.create(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(userMockWithId)).to.be.true;
    });
  });

  describe('reading users', () => {
    beforeEach(async () => {
      sinon.stub(userService, 'read').resolves([userMockWithId]);
    });

    it('should read users', async () => {
      await userController.read(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith([userMockWithId])).to.be.true;
    });
  });

  describe('updating a user', () => {
    beforeEach(async () => {
      sinon.stub(userService, 'update').resolves(userMockWithId);
    });

    it('should update a user', async () => {
      req.params = { id: userMockWithId._id };
      req.body = userMock;
      await userController.update(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(userMockWithId)).to.be.true;
    });
  });

  describe('deleting a user', () => {
    beforeEach(async () => {
      sinon.stub(userService, 'delete').resolves(userMockWithId);
    });

    it('should delete a user', async () => {
      req.params = { id: userMockWithId._id };
      await userController.delete(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(userMockWithId)).to.be.true;
    });
  });
});