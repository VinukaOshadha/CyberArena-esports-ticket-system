const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
      trim: true
    },


    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },


    password: {
      type: String,
      required: true,
      minlength: 6
    },


    playerId: {
      type: String,
      required: true,
      unique: true
    }

  },

  {
    timestamps: true
  }
);


// Encrypt password before saving user
userSchema.pre(
  'save',
  async function (next) {

    if (!this.isModified('password')) {
      return next();
    }

    const salt =
      await bcrypt.genSalt(10);

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

    next();
  }
);


// Compare entered password
// with encrypted database password
userSchema.methods.matchPassword =
  async function (enteredPassword) {

    return await bcrypt.compare(
      enteredPassword,
      this.password
    );

  };


const User =
  mongoose.model(
    'User',
    userSchema
  );


module.exports = User;