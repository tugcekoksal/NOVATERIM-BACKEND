/*
============ Express ============ 
*/
const express = require("express");
const router = express.Router();
/*
============ Import modules ============ 
*/
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const cloudinary_KEY = process.env.CLOUDINARY_URL;




/*============ GET route for home page ============ */
router.get("/", function (req, res, next) {
   res.render("index", { title: "Express" });
});



/*============ POST route to handle PDF file upload ============ */
router.post("/upload", async(req, res) => {
	
	const file = req.files.pdfFile;
	const username = file.name + '-';

	const documentPath = `./tmp/${uniqid()}.pdf`;

	const resultMove = await req.files.pdfFile.mv(documentPath);
	
	console.log(file);
	console.log(username);

	if(!resultMove){
      const resultCloudinary = await cloudinary.uploader.upload(documentPath, { 
			folder: `NOVATERIM/users/${username}`,
			public_id: `${uniqid()}`
		});
		console.log(resultCloudinary);
      res.json({ result: true, url: resultCloudinary.secure_url, name: resultCloudinary.original_filename });
   }else{
      res.json({ result: false, error: resultMove });
   }

   fs.unlinkSync(documentPath);
   
});

module.exports = router;
