const mongoose = require('mongoose');


const tournamentSchema =
  new mongoose.Schema(
    {

      title: {
        type: String,
        required: true,
        trim: true
      },


      game: {
        type: String,
        required: true,
        trim: true
      },


      description: {
        type: String,
        required: true,
        trim: true
      },


      date: {
        type: Date,
        required: true
      },


      price: {
        type: Number,
        required: true,
        min: 0
      },


      totalSeats: {
        type: Number,
        required: true,
        min: 0
      },


      availableSeats: {
        type: Number,
        required: true,
        min: 0
      },


      image: {
        type: String,
        default: ''
      }

    },

    {
      timestamps: true
    }
  );


const Tournament =
  mongoose.model(
    'Tournament',
    tournamentSchema
  );


module.exports = Tournament;