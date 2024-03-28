import { Router } from 'express';
import { getALLUsers, userSignup, userLogin, verifyUser } from '../controllers/uesrs-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js'
import { log } from 'util';
import { verifyToken } from '../utils/token-manager.js';

const userRoutes = Router();

userRoutes.get('/', getALLUsers);
userRoutes.post('/signup',validate(signupValidator), userSignup);
userRoutes.post('/login',validate(loginValidator), userLogin);
userRoutes.get('/auth-status',verifyToken, verifyUser);
export default userRoutes;