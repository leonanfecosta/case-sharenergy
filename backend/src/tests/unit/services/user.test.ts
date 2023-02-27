import * as sinon from 'sinon';
import chai from 'chai';
import UserModel from '../../../models/user.model';
import UserService from '../../../services/user.service';
import { ZodError } from 'zod';
import { userMockWithId, userMock } from '../../mocks/user.mock';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('User Service', () => {
  const userModel = new UserModel();
  const userService = new UserService(userModel);

  before(async () => {
    sinon.stub(userModel, 'create').resolves(userMockWithId);
    sinon.stub(userModel, 'read').resolves([userMockWithId]);
    sinon
      .stub(userModel, 'readOneUser')
      .onCall(0)
      .resolves(null)
      .onCall(1)
      .resolves(userMockWithId);
    sinon
      .stub(userModel, 'update')
      .onCall(0)
      .resolves(userMockWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(userModel, 'delete')
      .onCall(0)
      .resolves(userMockWithId)
      .onCall(1)
      .resolves(null);
  });

  after(async () => {
    sinon.restore();
  });

  describe('creating a user', () => {
    it('should create a user', async () => {
      const user = await userService.create(userMock);
      expect(user).to.be.eql(userMockWithId);
    });

    it('should throw a ZodError', async () => {
      let error: any;
      try {
        await userService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });

    it('should throw an EntityAlreadyExists error', async () => {
      let error: any;
      try {
        await userService.create(userMock);
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.EntityAlreadyExists);
    });
  });

  describe('reading users', () => {
    it('should read users', async () => {
      const users = await userService.read();
      expect(users).to.be.eql([userMockWithId]);
    });
  });

  describe('updating a user', () => {
    it('should update a user', async () => {
      const user = await userService.update(userMockWithId._id, userMock);
      expect(user).to.be.eql(userMockWithId);
    });

    it('should throw a ZodError', async () => {
      let error: any;
      try {
        await userService.update('any-id', { INVALID: 'OBJECT' });
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });

    it('should throw an EntityNotFound error', async () => {
      let error: any;

      try {
        await userService.update('invalidId', userMock);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.EntityNotFound);
    });
  });

  describe('deleting a user', () => {
    it('should delete a user', async () => {
      const user = await userService.delete(userMockWithId._id);
      expect(user).to.be.eql(userMockWithId);
    });

    it('should throw an EntityNotFound error', async () => {
      let error: any;

      try {
        await userService.delete('invalidId');
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.EntityNotFound);
    });
  });
});
