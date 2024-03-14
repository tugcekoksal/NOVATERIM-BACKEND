const mongoose = require("mongoose");


let connectionString = process.env.DB_USER; 
console.log(connectionString);

mongoose
   .connect(connectionString, { connectTimeoutMS: 2000 })
   .then(() => console.log("Database connected"))
   .catch((error) => console.error(error));


module.exports = connectionString;