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
			public_id: `${document}_pdf`
		});
		console.log(resultCloudinary);
	/*
   ======= Saving url document to DDB =======
   */
		switch(document) {
			case 'identityCard':
				User.updateOne(
					{ token: token },
					{
						identityCard : resultCloudinary.secure_url,
					}
				).then(() => {
					User.findOne({ identityCard: resultCloudinary.secure_url }).then((data) => {
						if(data) {
							res.json({ result: true, identityCard: resultCloudinary.secure_url });
						}
					})
				})
				break;
			case 'vitalCard':
				User.updateOne(
					{ token: token },
					{
						vitalCard : resultCloudinary.secure_url,
					}
				).then(() => {
					User.findOne({ vitalCard: resultCloudinary.secure_url }).then((data) => {
						if(data) {
							res.json({ result: true, vitalCard: resultCloudinary.secure_url });
						}
					})
				})
				break;
			case 'resume':
				User.updateOne(
					{ token: token },
					{
						resume : resultCloudinary.secure_url,
					}
				).then(() => {
					User.findOne({ resume: resultCloudinary.secure_url }).then((data) => {
						if(data) {
							res.json({ result: true, resume: resultCloudinary.secure_url });
						}
					})
				})
				break;
			case 'iban':
				User.updateOne(
					{ token: token },
					{
						iban : resultCloudinary.secure_url,
					}
				).then(() => {
					User.findOne({ iban: resultCloudinary.secure_url }).then((data) => {
						if(data) {
							res.json({ result: true, iban: resultCloudinary.secure_url });
						}
					})
				})
				break;
			case 'homePaper':
				User.updateOne(
					{ token: token },
					{
						homePaper : resultCloudinary.secure_url,
					}
				).then(() => {
					User.findOne({ homePaper: resultCloudinary.secure_url }).then((data) => {
						if(data) {
							res.json({ result: true, homePaper: resultCloudinary.secure_url });
						}
					})
				})
				break;
			default:
				res.json({ result: false, error: 'document is not in DataBase' });
		}
   }else{
      res.json({ result: false, error: resultMove });
   }

   fs.unlinkSync(documentPath);
   
});

module.exports = router;
