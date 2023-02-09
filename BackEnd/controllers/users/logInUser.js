import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel/userModel.js';

const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username }); // will find username in the db

    //conditional statment if user exist or not.
    if (!user) {
      return res.status(400).json({ message: 'user does not exist.' });
    }
    const isMatch = await bcrypt.compare(password, user.password); //compare the encrypted password to the password
    //conditional statement to check is the password match or not
    if (!isMatch) {
      return res.status(400).json({ message: 'invalid credentials.' });
    }

    //this will create an access token.
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password; //will delete the encrypted password.

    // will response the details
    res.status(200).json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default logInUser;
