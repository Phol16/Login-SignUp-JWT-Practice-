
const getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestDate,
    data: `data here ${req.params.id}`,
  })
}

export default getUser