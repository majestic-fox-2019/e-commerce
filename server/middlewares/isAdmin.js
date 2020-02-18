module.exports = (req, res, next) => {
  try {
    console.log(req.user)
    if (req.user.role == 'admin') {
      next()
    } else {
      throw error
    }
  } catch (error) {
    res.status(400).json({ message: 'Only admin can change!' })
  }
}