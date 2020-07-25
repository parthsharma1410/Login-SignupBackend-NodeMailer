const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
      type: String,
      require: true
  },
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    require: true
  },
  day: {
    type: Number,
    require: true
  },
  hour: {
      type: Number,
      require: true
  },
  minute: {
      type: Number,
      require: true
  },
  ampm: {
      type: String,
      require: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
