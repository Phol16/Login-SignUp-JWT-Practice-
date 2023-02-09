import { Router } from 'express';
import createUser from '../../controllers/users/createUser.js';
import getUser from '../../controllers/users/getUser.js';
import logInUser from '../../controllers/users/logInUser.js';

const router = Router();

router.route('/').get(logInUser).post(createUser);

router.route('/:id').get(getUser);

export default router;
