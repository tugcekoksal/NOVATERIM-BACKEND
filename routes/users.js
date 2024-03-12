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
   if (!checkBody(req.body, ["firstName", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
   }

   // Check if the user has not already been registered
   const hash = bcrypt.hashSync(req.body.password, 10);
   const token = uid2(32);
   console.log(req.body.email)
   
   User.findOne({ email: req.body.email }).then((data) => {

      if (data.password) {
         console.log(data.password);
         res.json({ result: false, error: "The specified User already exists." });
      }else{
         User.updateOne(
            { email: req.body.email },
            {
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
                  console.log(data);
                  res.json({ result: true, data });
               }
            });
         });

      }
   })

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
router.put("/update/:token", async (req, res) => {
   try {
       const token = req.params.token;
       const updatedItem = req.body; // Les données à mettre à jour
      
       console.log(updatedItem)
 

       // Find the user by token
       const user = await User.findOne({ token: token });

      //  console.log(user)
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

       // Update the user

       const result = await User.findByIdAndUpdate(user._id,updatedItem , { new: true });
 
       if (!result) {
           return res.status(404).json({ message: 'Update failed' });
       }

      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({ message: "Error updating the user" });
   }
});
router.get("/:token", async (req, res) => {
   try {
      const token = req.params.token;

      // Find the user by token
      const user = await User.findOne({ token: token });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      // Return the user information
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json({ message: "Error retrieving the user" });
   }
});

module.exports = router;
