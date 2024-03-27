import { Router } from 'express';
import { getALLUsers, userSignup } from '../controllers/uesrs-controllers.js';

const userRoutes = Router();

userRoutes.get('/', getALLUsers);
userRoutes.post('/signup', userSignup);
export default userRoutes;