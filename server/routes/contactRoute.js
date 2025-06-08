// import {Router} from 'express'
// import { submitContact } from '../controllers/contactController.js';
// const router = Router();

// // router.post("/user",createUser);
// // POST /api/newuser
// router.post('/newuser', submitContact);

   
// export default router
 




// routes/contactRoute.js

import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContact);


export default router;
