const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
});

// This creates the collection. In this case the name will be 300351004-Sebastian
const Bookmodel = mongoose.model("30051004-Juan", bookSchema);
module.exports = Bookmodel;