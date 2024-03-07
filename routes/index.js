/*
============ Express ============ 
*/
const express = require("express");
const router = express.Router();
/*
============ Import modules ============ 
*/
require("../models/connection");
const User = require("../models/users");


const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const cloudinary_KEY = process.env.CLOUDINARY_URL;




/*============ GET route for home page ============ */
router.get("/", function (req, res, next) {
   res.render("index", { title: "Express" });
});



/*============ POST route to handle PDF file upload ============ */
router.post("/upload/:token/:document", async(req, res) => {
	
	const token = req.params.token;
	const document = req.params.document;
	
	console.log(token);
	console.log(document);
	
	const file = req.files.pdfFile;
	const username = file.name + '-';

	const documentPath = `./tmp/${uniqid()}.pdf`;
	const resultMove = await req.files.pdfFile.mv(documentPath);

	if(!resultMove){
      const resultCloudinary = await cloudinary.uploader.upload(documentPath, { 
			folder: `NOVATERIM/users/${username}`,
			public_id: `${uniqid()}_pdf`
		});
		console.log(resultCloudinary);
      res.json({ result: true, url: resultCloudinary.secure_url, name: resultCloudinary.original_filename });
		User.updateOne({ })
   }else{
      res.json({ result: false, error: resultMove });
   }

   fs.unlinkSync(documentPath);
   
});

module.exports = router;
