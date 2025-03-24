import {Router} from 'express'
import { createUser } from '../controllers/contactController.js';
const router = Router();

router.post("/user",createUser);
   
export default router
 