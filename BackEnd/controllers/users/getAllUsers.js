import User from '../../models/userModel/userModel.js';

const getAllUsers = async (req, res) => {
 
  let query = User.find(); 

  const user = await query;

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestDate,
    result: user.length,
    data: user,
  });
};

export default getAllUsers;
