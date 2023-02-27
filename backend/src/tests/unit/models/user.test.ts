import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import UserModel from '../../../models/user.model';
import { userMock, userMockWithId } from '../../mocks/user.mock';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('User Model', () => {
  const userModel = new UserModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(userMockWithId);
    sinon.stub(Model, 'findOne').resolves(userMockWithId);
    sinon.stub(Model, 'find').resolves([userMockWithId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(userMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(userMockWithId);
  });

  after(async () => {
    sinon.restore();
  });

  describe('create a user', () => {
    it('should create a user', async () => {
      const user = await userModel.create(userMock);
      expect(user).to.be.eql(userMockWithId);
    });
  });

  describe('getting all users', () => {
    it('should get all users', async () => {
      const users = await userModel.read();
      expect(users).to.be.eql([userMockWithId]);
    });
  });

  describe('getting a user', () => {
    it('should get a user', async () => {
      const user = await userModel.readOneUser(userMockWithId.email, userMockWithId.cpf);
      expect(user).to.be.eql(userMockWithId);
    });
  });

  describe('updating a user', () => {
    it('should update a user', async () => {
      const user = await userModel.update(userMockWithId._id, userMock);
      expect(user).to.be.eql(userMockWithId);
    });

    it('should throw an error if the id is invalid', async () => {
      let error: any;
      try {
        await userModel.update('invalidId', userMock);
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId);
    });
  });

  describe('deleting a user', () => {
    it('should delete a user', async () => {
      const user = await userModel.delete(userMockWithId._id);
      expect(user).to.be.eql(userMockWithId);
    });

    it('should throw an error if the id is invalid', async () => {
      let error: any;
      try {
        await userModel.delete('invalidId');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.eql(ErrorTypes.InvalidMongoId);
    });
  });
});
