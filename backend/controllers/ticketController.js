const mongoose =
  require('mongoose');

const Ticket =
  require('../models/Ticket');

const Tournament =
  require('../models/Tournament');


// =====================================================
// Generate Unique Ticket Code
// =====================================================

const generateTicketCode =
  async () => {

    let ticketCode;
    let exists = true;


    while (exists) {

      const randomNumber =
        Math.floor(
          1000 + Math.random() * 9000
        );


      ticketCode =
        `CA-${Date.now()}-${randomNumber}`;


      exists =
        await Ticket.exists({
          ticketCode
        });

    }


    return ticketCode;

  };


// =====================================================
// Reserve Ticket
// =====================================================

const reserveTicket =
  async (req, res) => {

    let seatWasReduced = false;


    try {

      const {
        tournamentId
      } = req.params;


      if (
        !mongoose.Types.ObjectId.isValid(
          tournamentId
        )
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Invalid tournament ID'

          });

      }


      const tournament =
        await Tournament.findById(
          tournamentId
        );


      if (!tournament) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              'Tournament not found'

          });

      }


      const existingTicket =
        await Ticket.findOne({

          user:
            req.user._id,

          tournament:
            tournamentId,

          status:
            'RESERVED'

        });


      if (existingTicket) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'You already reserved a ticket for this tournament'

          });

      }


      if (
        tournament.availableSeats <= 0
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'No seats are available for this tournament'

          });

      }


      const updatedTournament =
        await Tournament.findOneAndUpdate(

          {
            _id:
              tournamentId,

            availableSeats: {
              $gt: 0
            }
          },

          {
            $inc: {
              availableSeats: -1
            }
          },

          {
            new: true
          }

        );


      if (!updatedTournament) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'No seats are available for this tournament'

          });

      }


      seatWasReduced = true;


      const ticketCode =
        await generateTicketCode();


      const ticket =
        await Ticket.create({

          user:
            req.user._id,

          tournament:
            tournamentId,

          ticketCode,

          price:
            tournament.price,

          status:
            'RESERVED'

        });


      await ticket.populate(
        'tournament',
        'title game date price totalSeats availableSeats'
      );


      res
        .status(201)
        .json({

          success: true,

          message:
            'Ticket reserved successfully',

          ticket

        });


    } catch (error) {

      if (
        seatWasReduced &&
        req.params.tournamentId
      ) {

        try {

          await Tournament
            .findByIdAndUpdate(

              req.params.tournamentId,

              {
                $inc: {
                  availableSeats: 1
                }
              }

            );

        } catch (rollbackError) {

          console.error(
            'Seat rollback error:',
            rollbackError.message
          );

        }

      }


      console.error(
        'Ticket reservation error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while reserving ticket'

        });

    }

  };


// =====================================================
// Get Logged-In User Tickets
// =====================================================

const getMyTickets =
  async (req, res) => {

    try {

      const tickets =
        await Ticket.find({

          user:
            req.user._id

        })

          .populate(
            'tournament',
            'title game date price totalSeats availableSeats'
          )

          .sort({
            createdAt: -1
          });


      res
        .status(200)
        .json({

          success: true,

          count:
            tickets.length,

          tickets

        });


    } catch (error) {

      console.error(
        'Get tickets error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while retrieving tickets'

        });

    }

  };


// =====================================================
// Cancel Ticket
// =====================================================

const cancelTicket =
  async (req, res) => {

    try {

      const {
        ticketId
      } = req.params;


      // Validate ticket ID
      if (
        !mongoose.Types.ObjectId.isValid(
          ticketId
        )
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Invalid ticket ID'

          });

      }


      // Find ticket belonging to logged-in user
      const ticket =
        await Ticket.findOne({

          _id:
            ticketId,

          user:
            req.user._id

        });


      if (!ticket) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              'Ticket not found'

          });

      }


      // Prevent duplicate cancellation
      if (
        ticket.status ===
        'CANCELLED'
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Ticket is already cancelled'

          });

      }


      // Change ticket status
      ticket.status =
        'CANCELLED';


      await ticket.save();


      // Return one seat to tournament
      await Tournament.findByIdAndUpdate(

        ticket.tournament,

        {
          $inc: {
            availableSeats: 1
          }
        }

      );


      await ticket.populate(
        'tournament',
        'title game date price totalSeats availableSeats'
      );


      res
        .status(200)
        .json({

          success: true,

          message:
            'Ticket cancelled successfully',

          ticket

        });


    } catch (error) {

      console.error(
        'Ticket cancellation error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while cancelling ticket'

        });

    }

  };


module.exports = {

  reserveTicket,

  getMyTickets,

  cancelTicket

};