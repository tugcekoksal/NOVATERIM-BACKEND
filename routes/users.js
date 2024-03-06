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

/* Post route for signUp */
router.post("/signup", (req, res, next) => {
   if (!checkBody(req.body, ["username", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
   }

   // Check if the user has not already been registered
   const hash = bcrypt.hashSync(req.body.password, 10);
   const token = uid2(32);
   User.updateOne(
      { email: req.body.email },
      { 
         username: req.body.username,
         password: hash,
         token: token,
         identity: {
            name: req.body.name,
            firstName: req.body.firstName,
            phoneNumber: Number(req.body.phoneNumber),
         },
      }
      ).then(() => {
         User.findOne({ email: req.body.email }).then((data) => {
            if (data) {
               res.json({ result: true, data });
            } else {
               // User already exists in database
               res.json({ result: false, error: "User already exists" });
            }
      })
   });

});

/* Post route for signin */
router.post("/signin", (req, res) => {

   if (!checkBody(req.body, ["email", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
   }
   
   User.findOne({ email: req.body.email }).then((data) => {
      if (bcrypt.compareSync(req.body.password, data.password)) {
         res.json({ result: true, data });
      } else {
         res.json({ result: false, error: "User not found" });
      }
   });
});

module.exports = router;
