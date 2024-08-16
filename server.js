const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// To run in port 5000
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---------------------  To run it in MongoDB Atlas (Cloud)
const uri = "mongodb+srv://jsbermudez1997:T_TP_.Ps%25GSbp2z@books.ycj8c.mongodb.net/";

// ---------------------- To run it locally
//const uri = "mongodb://127.0.0.1:27017/BookDB"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// import routes
const bookRouter = require('./routes/books');

// adding /api/v1/book in all routes
app.use('/api/v1/book', bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

/**
 * Structure to add a book
 * {
  "book": {
    "title": "Soccer",
    "author": "Sebastian Bermudez",
    "description": "All about soccer"
  }
}
 */
