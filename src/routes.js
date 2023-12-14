const express = require("express");
const bookManager = require("./bookManager");
const router = express.Router();



router.get('/books', (req, res) =>{
  //Get all books and send them to client
});

router.get('/books/:id', (req, res)=>{
  //Get a specific book with id. 
  //Extract id from URL -> Call function to get book if it exists. 
});


module.exports = router;