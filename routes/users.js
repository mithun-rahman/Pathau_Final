import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { createUser, getUser, deleteUser, updateUser, getAll} from '../controllers/users.js';

const router = express.Router();

// all routes here start with /users

router.get('/', getAll); 

router.post('/', createUser) ;

router.get('/:id', getUser);

router.delete('/:id', deleteUser) ;

//router.patch('/:id', updateUser) ;

router.put('/:id', updateUser) ;

export default router;