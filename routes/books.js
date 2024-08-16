const router = require('express').Router();
const Book = require('../model/bookmodel');

/**
 * JSON BODY TO TEST THE POST ROUTES
{
  "book": {
    "title": "title here",
    "author": "Author name here",
    "description": "description here"
  }
}
 */

// @route GET /api/v1/book
// @description Get all books
router.route('/').get((req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route GET /api/v1/book/:id
// @description Get single book by id
router.route('/:id').get((req, res) => {
  console.log('just id' + req.params.id);
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route POST /api/v1/book
// @description add/save book
router.route('/').post(async (req, res) => {
  const book = req.body.book;

  const newBook = await new Book({
    title: book.title,
    author: book.author,
    description: book.description
  });

  newBook
    .save()
    .then(() => res.json('Book added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route POST /api/v1/vbook/:id
// @description Update book by id
router.route('/:id').post(async (req, res) => {
  console.log(req.params.id);
  const { book } = req.body;

  await Book.findById(req.params.id)
    .then((bookforedit) => {
      if (!bookforedit) {
        return res.status(404).json('Book not found!');
      }

      bookforedit.title = book.title;
      bookforedit.author = book.author;

      bookforedit
        .save()
        .then(() => res.json('Book updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route DELETE /api/v1/book/:id
// @description Delete book by id
router.route('/:id').delete(async (req, res) => {

  await Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});


module.exports = router;
