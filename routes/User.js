import express from 'express';
import {createUser ,
        getUsers ,
        getUserById ,
        updateUser ,
        deleteUser ,
        login,
        fetchIdbyMongoId} from '../controllers/User.js';

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middlewares/authMiddleware.js';



dotenv.config();
/*const jwt = require('jsonwebtoken');
const config = require('../config'); 
const SECRET_KEY = config.SECRET_KEY;*/
//import { authenticateJWT } from '../middlewares/authMiddleware'; // Import the JWT middleware


const router = express.Router();

router.get('/profile', authenticateJWT, (req, res) => {
  
  res.status(200).json({ message: 'Protected route accessed' });
});

router
  .route("/")
  .post(createUser)
  .get(getUsers);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  
router
  .route('/login')
  .post(login,(req, res) => {

    console.log("test")

    const _id = req.user._id;
    const username = req.user.username;
  
    const token = jwt.sign({ _id, username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
    return res.status(200).json({ token });
  })

router
  .route('/by-id/:id')
  .get(fetchIdbyMongoId)


export default router;
