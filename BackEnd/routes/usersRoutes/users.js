import { Router } from 'express';
import createUser from '../../controllers/users/createUser.js';
import getAllUsers from '../../controllers/users/getAllUsers.js';
import getUser from '../../controllers/users/getUser.js';

const router = Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser);

export default router;
