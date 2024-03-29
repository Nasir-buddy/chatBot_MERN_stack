import { Router } from 'express';
import { getALLUsers, userSignup, userLogin, verifyUser, userLogout } from '../controllers/uesrs-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';
const userRoutes = Router();
userRoutes.get('/', getALLUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.get('/logout', verifyToken, userLogout);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map