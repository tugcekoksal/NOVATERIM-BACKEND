/*
============ Import express ============ 
*/
const express = require("express");
const router = express.Router();
/*
============ Import uid2 for user token ============ 
*/
const uid2 = require("uid2");
/*
============ Import bcrypt password cryptography ============ 
*/
const bcrypt = require("bcrypt");
/*
============ Import User model and connection ============ 
*/
require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

/* GET users listing. */
router.post("/sign-up", (req, res, next) => {
   if (!checkBody(req.body, ["username", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
   }

   // Check if the user has not already been registered
   const hash = bcrypt.hashSync(req.body.password, 10);
	const token = uid2(32);
   User.findOne({ email: req.body.email }).then((data) => {
      if (data === null) {

			const userIdentity = {
				name: req.body.name,
				firstname: req.body.firstname,
				phoneNumber: req.body.phoneNumber,
			}

         const newUser = new User({
            username: req.body.username,
				email: req.body.email,
            password: hash,
            token: token,
				identity: [userIdentity],
         });

         newUser.save().then((data) => {
            res.json({ result: true, data });
         });
      } else {
         // User already exists in database
         res.json({ result: false, error: "User already exists" });
      }
   });

   res.send("respond with a resource");
});

module.exports = router;
