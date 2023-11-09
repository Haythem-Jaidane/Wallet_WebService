import express from 'express';
import {createUser ,
        getUsers ,
        getUserById ,
        updateUser ,
        deleteUser ,
        login,
        fetchIdbyMongoId} from '../controllers/User.js';
/*const jwt = require('jsonwebtoken');
const config = require('../config'); 
const SECRET_KEY = config.SECRET_KEY;*/
//import { authenticateJWT } from '../middlewares/authMiddleware'; // Import the JWT middleware


const router = express.Router();


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
  .post(login)

router
  .route('/by-id/:id')
  .get(fetchIdbyMongoId)
/*router.get('/profile', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
  });  
router.get('/:id', userController.getUserById);
router.get('/by-id/:id', userController.fetchIdbyMongoId);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login, (req, res) => {
    const { _id, username } = req.user;
  
    const token = jwt.sign({ _id, username }, SECRET_KEY, { expiresIn: '1h' });
  
    res.status(200).json({ token });
  });*/


export default router;
