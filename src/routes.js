const express = require("express");
const {getAllBooks, addNewBook} = require("./bookManager");
const router = express.Router();



router.get('/books', (req, res) =>{
  try {
    res.status(200).send(getAllBooks());
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
  
});

router.get('/books/:id', (req, res)=>{
  //Get a specific book with id. 
  //Extract id from URL -> Call function to get book if it exists. 
});

router.post('/books', async (req, res)=>{
  try {
    await addNewBook(req, res);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
});


module.exports = router;