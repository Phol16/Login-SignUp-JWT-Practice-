
const errors = (error,req,res,next) => {
  res.status(500).json({
    error:error.message,
  })
}

export default errors