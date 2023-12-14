const Book = require("./book");

//My Collection of Books
const myBooks = [];

//Populate collection with books for testing
myBooks.push(new Book("1", "A", "Gustaf", "2008"));

function getAllBooks(){
  return myBooks;
}

async function addNewBook (req, res) {
  try {
    const bookInfo = req.body;
    if(bookInfo_isValid(bookInfo)){
      const {book_id, title, author, pubYear} = bookInfo;
      const newBook = new Book(book_id, title, author, pubYear); 
      myBooks.push(newBook);
      res.status(200).json(newBook);
    }
    
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
  
  
}

function bookInfo_isValid(info){
  const {book_id} = info;
  if(myBooks.length === 0){
    return true;
  }

  const uniqueId = (myBooks.find((book) => book.book_id === book_id) === undefined);
  return uniqueId;
    
}


module.exports = {getAllBooks, addNewBook};