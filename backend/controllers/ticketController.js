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


      // Validate MongoDB ID
      if (
        !mongoose.Types.ObjectId
          .isValid(tournamentId)
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Invalid tournament ID'

          });

      }


      // Find tournament
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


      // Check existing reservation
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


      // Check available seats
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


      // Atomically reduce one seat
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


      // Generate ticket code
      const ticketCode =
        await generateTicketCode();


      // Create ticket
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


      // Add tournament information
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

      // Restore seat if ticket creation failed
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

        } catch (
          rollbackError
        ) {

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


module.exports = {

  reserveTicket,

  getMyTickets

};