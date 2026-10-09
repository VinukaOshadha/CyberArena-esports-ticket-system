const mongoose = require('mongoose');


const ticketSchema =
  new mongoose.Schema(
    {

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },


      tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
      },


      ticketCode: {
        type: String,
        required: true,
        unique: true
      },


      price: {
        type: Number,
        required: true,
        min: 0
      },


      status: {
        type: String,
        enum: [
          'RESERVED',
          'CANCELLED'
        ],
        default: 'RESERVED'
      },


      reservedAt: {
        type: Date,
        default: Date.now
      }

    },

    {
      timestamps: true
    }
  );


const Ticket =
  mongoose.model(
    'Ticket',
    ticketSchema
  );


module.exports = Ticket;