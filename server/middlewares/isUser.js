module.exports = (req, res, next) => {
  try {
    if (req.user.role == 'user') {
      next()
    } else {
      throw error
    }
  } catch (error) {
    res.status(400).json({ message: 'Transaction declined!' })
  }
}