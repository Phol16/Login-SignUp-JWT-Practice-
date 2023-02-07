import User from '../../models/userModel/userModel.js';

const getAllUsers = async (req, res) => {
  //filtering stuff with query
  const queryObj = { ...req.query }; // will store all of the query in an object, destructuring makes it individually

  //advance filtering
  let queryStr = JSON.stringify(queryObj); //convert JSON Data  into a string
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // by using an regular expression it will just replace what it matches at the RegEx

  let query = User.find(JSON.parse(queryStr)); // this will convert it back and by separating await you can chain mongoose methods

  //sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy); //sorting by using sort method
  } else {
    query = query.sort('-createdAt'); // if sort is not specify it will sort by createdAt
  }

  //field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields); //selected fields are  send
  } else {
    query = query.select('-__v'); // prefix '-' to exclude or not include this field
  }

  //pagination
  const page = req.query.page * 1 || 1  //(*1 converting the query into a number) and || 1 as default number;
  const limit = req.query.limit * 1 || 10 // the same for limit
  const skip = (page - 1) * limit; // pagination it will skip certain amout of data to display the next group of data
  query = query.skip(skip).limit(limit);

  //this condition if we skip more documents than stored
  // if(req.query.page){
    //const numOfDoc=await db.countDocuments(); will return the number of documents
    //if(skip>= numOfDoc)throw new Error('this page does not exist') this will move to the catch block and send the error message
  // }


  // query.sort().select.() etc. chaining the query more effective
  const user = await query;

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestDate,
    result: 'result here',
    data: user,
  });
};

export default getAllUsers;
