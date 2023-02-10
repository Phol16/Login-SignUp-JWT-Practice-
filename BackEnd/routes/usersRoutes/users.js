import { Router } from 'express';
import createUser from '../../controllers/users/createUser.js';
import getUser from '../../controllers/users/getUser.js';
import logInUser from '../../controllers/users/logInUser.js';
import verifyToken from '../../middleware/verifyToken.js';

const router = Router();

router.route('/logIn').post(logInUser)
router.route('/signUp').post(createUser);

router.route('/:id').get(verifyToken, getUser);

export default router;
