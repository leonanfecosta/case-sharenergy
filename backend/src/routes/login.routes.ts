import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';
import LoginModel from '../models/login.model';

const router = Router();

const loginModel = new LoginModel();
const loginService = new LoginService(loginModel);
const loginController = new LoginController(loginService);

router.post('/', (req, res) => loginController.readOneLogin(req, res));

export default router;