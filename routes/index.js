/*
============ Express ============ 
*/
const express = require("express");
const router = express.Router();
/*
============ Import modules ============ 
*/
const multer = require('multer');
const path = require('path');

const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const cloudinary_KEY = process.env.CLOUDINARY_URL;


// Setting up Multer for file upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/') // Destination folder for uploads
	},
	filename: function (req, file, cb) {

		// Using the original file name
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });



/*============ GET route for home page ============ */
router.get("/", function (req, res, next) {
   res.render("index", { title: "Express" });
});



/*============ POST route to handle file upload ============ */
router.post("/upload", upload.single('pdfFile'), async(req, res) => {
	
	const file = req.files.pdfFile;
	console.log(file);

	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, 
			{ folder: 'NOVATERIM/admin' },
		function(error, result) {
			console.log(result, error);
		});

		const fileUrl = result.secure_url;

		// Saving the url to database

		//

		res.json({ result: true, url: fileUrl });

	}catch (error) {
		console.error('Cloudinary upload error', error);
		res.json({ result: false, error: 'Error uploading file to Cloudinary' })
	}
   
});

module.exports = router;
