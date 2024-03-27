import { Router } from 'express';
import { getALLUsers, userSignup, userLogin } from '../controllers/uesrs-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js'
import { log } from 'util';

const userRoutes = Router();

userRoutes.get('/', getALLUsers);
userRoutes.post('/signup',validate(signupValidator), userSignup);
userRoutes.post('/login',validate(loginValidator), userLogin);
export default userRoutes;