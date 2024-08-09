import { Router } from 'express';

import {
    loginController,
} from '../../controllers/auth/authController.js';

const authRouter = Router();

authRouter.post('/login', loginController);

export default authRouter;
