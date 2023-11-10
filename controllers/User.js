/*const config = require('../config'); 
const SECRET_KEY = config.SECRET_KEY;*/
import User from '../models/User.js'
import {addWallet} from './Wallet.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();



// Create User
export function createUser(req, res){
    //var wallet = addWallet()
    //if(wallet != null){
    User.create({
      id: req.body.id,
      name: req.body.name,
      fname: req.body.fname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      //id_wallet:wallet._id,
      type: req.body.type
    }).then((user) => {
      return res.status(201).json(user);
    }).catch((error) => {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    });/*}
    else{
      return res.status(500).json({ message: "wallet failled to add" });
    }*/
}

// Search All Users
export function getUsers(req, res){

  User.find({})
    .then((users) => {
      let user_list = [];
            for (let i = 0; i < users.length; i++) {
              user_list.push({
                _id : users[i]._id,
                id: users[i].id,
                name: users[i].name,
                fname: users[i].fname,
                phone: users[i].phone,
                email: users[i].email,
                username: users[i].username,
                password: users[i].password,
                type: users[i].type
                   
              });
            }
      res.status(200).json(user_list);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
  
};


// Search User by ID
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: `Cannot find any user with ID ${req.params.id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Update User
export async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: `Cannot find any user with ID ${req.params.id}` });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Delete User
export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: `Cannot find any user with ID ${req.params.id}` });
    }

    // Optionally, you can return the deleted user in the response
    res.status(200).json({ message: 'User deleted successfully', deletedUser: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// fetch long id with short id
export async function fetchMongoidbyID(req, res) {
  try {
    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: `Cannot find any users with id ${req.params.id}` });
    }

    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



// Login
export function login(req, res, next){

    User.findOne({ username:req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      //const isPasswordValid = await bcrypt.compare(password, user.password);
      
  
      if (req.body.password !== user.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      console.log("j")
      const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
      console.log("j")
      req.user = { _id: user._id, username: user.username, token };
      console.log("j")
      next();

    }).catch ((error) =>{
    res.status(500).json({ message: error });
    })
}

