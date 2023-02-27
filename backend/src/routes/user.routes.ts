import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';

const router = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

router.post('/', (req, res) => userController.create(req, res));
router.get('/', (req, res) => userController.read(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.delete(req, res));

export default router;