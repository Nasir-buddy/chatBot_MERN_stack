import { Router } from 'express';
import { getALLUsers, userSignup } from '../controllers/uesrs-controllers.js';
import { signupValidator, validate } from '../utils/validators.js'

const userRoutes = Router();

userRoutes.get('/', getALLUsers);
userRoutes.post('/signup',validate(signupValidator), userSignup);
export default userRoutes;