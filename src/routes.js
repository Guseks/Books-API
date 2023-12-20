const express = require("express");
const {getAllBooks, addNewBook, getBook, deleteBookById} = require("./bookManager");
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

router.post('/books', async (req, res)=>{
  try {
    await addNewBook(req, res);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    getBook(req, res); 
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
});

router.delete("/books/:id", (req, res)=> {
  try {
    deleteBookById(req,res);
  }
  catch (error){
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
  
});

module.exports = router;