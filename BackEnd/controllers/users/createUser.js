import User from '../../models/userModel/userModel.js';

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const theUser = await User.create({ username, password });

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestDate,
      data: theUser,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

export default createUser;
