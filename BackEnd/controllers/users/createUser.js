import User from '../../models/userModel/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(); //creating a random salt for encryption 
    const passwordHash = await bcrypt.hash(password, salt); //this will encrypt the password by hashing the password with salt

    const newUser = new User({
      username, 
      password: passwordHash, // to store in db the password hash
    })

    const savedUser = await newUser.save(); // this will save the the details of the user in the db

    //201 status code that means it created something 
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestDate,
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      requestedAt: req.requestDate,
      error: err,
    });
  }
};

export default createUser;
