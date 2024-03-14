const mongoose = require("mongoose");


<<<<<<< HEAD


let connectionString = process.env.DB_USER;
=======
let connectionString = process.env.DB_USER; 
>>>>>>> tugce
console.log(connectionString);

mongoose
   .connect(connectionString, { connectTimeoutMS: 2000 })
   .then(() => console.log("Database connected"))
   .catch((error) => console.error(error));


module.exports = connectionString;