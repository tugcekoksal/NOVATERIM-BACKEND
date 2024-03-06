const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

/* Upload file */
router.post("/upload", (req, res, next) => {
  
})

module.exports = router;
