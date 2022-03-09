import { Router } from 'express';

import { CreateUserController } from '../../../../modules/users/useCases/createUser/CreateUserController';
import { userProfileRouter } from './userProfile.routes';

const usersRouter = Router();
const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.execute);
usersRouter.use(userProfileRouter)

export { usersRouter };
