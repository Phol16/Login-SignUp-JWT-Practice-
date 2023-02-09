import jwt from 'jsonwebtoken'

const verifyToken = async(req, res, next) => {
try {
  let accessToken = req.header('Authorization'); // getting the access token in the authorization header

  //conditional statement to check if accesstoken was placed.
  if(!accessToken){
    return res.status(403).json({message:'Access Denied.'});
  }
  //getting the accesstoken in the authorization header with bearer in the begining by default
  if(accessToken.startsWith('bearer ')){
    accessToken = token.slice(7, accessToken.length).trimLeft(); // will getthe rightside of the token/header authorization
  }

  //this will verify the user if the access token matched
  const verified = jwt.verify(accessToken, process.env.JWT_SECRET);
  req.user = verified // this will set req.user value to the verified value;

  next();

} catch (error) {
  res.status(500).json({message: error})
}
}

export default verifyToken