import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Must have a username'], // response this error
    unique: true, //validation to check this field to be unique
  },
  password: {
    type: String,
    required: [true, 'Must have a password'], // response this error
  },
  createdAt:{
    type: Date,
    default: Date.now(),
    select: false, //this will exclude in sending to the client
  }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
