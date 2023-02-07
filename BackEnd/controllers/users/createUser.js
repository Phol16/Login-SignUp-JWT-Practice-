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
    res.status(500).json({
      status: 'failed',
      error: err,
    });
  }
};

export default createUser;
