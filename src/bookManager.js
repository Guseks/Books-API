const Book = require("./book");
const Joi = require("joi");

//My Collection of Books
const myBooks = [];

//Populate collection with books for testing
myBooks.push(new Book("1", "A", "Gustaf", "2008"));

function getAllBooks(){
  return myBooks;
}

function getBook(req, res){
  const book_id = req.params.id;
  const index = myBooks.findIndex(book => book.book_id === book_id);
  if(index !== -1){
    res.status(200).json({message: "Book Found", Book: myBooks[index]});
  }
  else {
    res.status(400).json({message: `Book with id ${book_id} not found, try again!`});
  }
 
}

 function deleteBookById(req, res){
  const book_id = req.params.id;
  const index = myBooks.findIndex(book => book.book_id === book_id);
  if(index !== -1){
    myBooks.splice(index, 1);
    res.status(200).json({message: `Book with id ${book_id} deleted`});
  }
  res.status(400).json({message: `Book with id ${book_id} not found, try again!`});
 } 

async function addNewBook (req, res) {
  try {
    const bookInfo = req.body;
    const validationResult = await bookInfo_isValid(bookInfo);


    if(validationResult.error){
    return res.status(400).json({message: validationResult.error.details[0].message});
    }

    if(validationResult.isValid){
      const {book_id, title, author, pubYear} = bookInfo;
      const newBook = new Book(book_id, title, author, pubYear); 
      myBooks.push(newBook);
      res.status(200).json(newBook);
    }
    else {
    res.status(400).json({message: "book_id needs to be unique"});
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
  
  
}

async function bookInfo_isValid(info){
  
  const schema = Joi.object({
    book_id: Joi.string().required().messages({
      'string.empty': 'Please provide a id for the book'
    }),
    title: Joi.string().required().messages({
      'string.empty': 'Please provide a title for the book'
      
    }),
    author: Joi.string().required().messages({
      'string.empty': 'Please provide a author for the book'
      
    }),
    pubYear: Joi.number()
    .required()
    .min(1990)
    .max(new Date().getFullYear())
    .messages({
      'number.base': 'Publication year must be a number',
      'number.empty': 'Please provide a publication year for the book',
      'number.min': 'Publication year must be greater than or equal to 1990',
      'number.max': 'Publication year needs to be less than or equal to current year'
    })
  });
  try {
    await schema.validateAsync(info);

    return {
      isValid: myBooks.every((book) => book.book_id !== info.book_id),
    }
  
  }
  catch (error){
    return {error};
  } 
}


module.exports = {getAllBooks, addNewBook, getBook, deleteBookById};