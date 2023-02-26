const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteMovies = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    likedMovies: Array,
  });

let User = mongoose.model('User',favoriteMovies);

module.exports = {User}