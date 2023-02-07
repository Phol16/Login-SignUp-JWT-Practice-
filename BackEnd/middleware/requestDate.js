
const requestDate = (req,res,next) => {
  req.requestDate = new Date().toISOString();
  next()
}

export default requestDate