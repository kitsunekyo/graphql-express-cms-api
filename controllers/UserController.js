const User = require('./../models/User');

module.exports = {
  index(req, res, next) {
    const users = User.find().then(r => {
      res.status(200).send( {
        error: false,
        data: r,
      })
    })
  },
}