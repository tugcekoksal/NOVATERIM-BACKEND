const express = require("express");
const router = express.Router();
const User = require("../models/users");






/* Get route for get all contracts */
router.get('/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .select('contracts')
    .then(user => {
      // Check if user was found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user has contracts
      if (user.contracts && user.contracts.length > 0) {
        res.json(user.contracts);
        console.log(user.contracts);
      } else {
        res.status(404).json({ message: 'No contracts found' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
});


module.exports = router;
