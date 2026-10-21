const mongoose = require('mongoose');

const Tournament = require('../models/Tournament');
const Ticket = require('../models/Ticket');
const SupportMessage = require('../models/SupportMessage');


// =====================================================
// ADMIN ACCESS CHECK
// =====================================================

const checkAdminAccess =
  async (req, res) => {

    try {

      res.status(200).json({

        success: true,

        message:
          'Admin access granted',

        admin: {

          id:
            req.user._id,

          name:
            req.user.name,

          email:
            req.user.email,

          playerId:
            req.user.playerId,

          role:
            req.user.role

        }

      });


    } catch (error) {

      console.error(
        'Admin access error:',
        error.message
      );


      res.status(500).json({

        success: false,

        message:
          'Server error while checking admin access'

      });

    }

  };


// =====================================================
// CREATE TOURNAMENT
// =====================================================

const createTournament =
  async (req, res) => {

    try {

      const {
        title,
        game,
        description,
        date,
        price,
        totalSeats
      } = req.body;


      if (
        !title ||
        !game ||
        !description ||
        !date ||
        price === undefined ||
        totalSeats === undefined
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Please provide all tournament fields'

          });

      }


      const numericPrice =
        Number(price);


      const numericSeats =
        Number(totalSeats);


      if (
        numericPrice < 0 ||
        numericSeats < 1
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Price and total seats must be valid positive values'

          });

      }


      const tournament =
        await Tournament.create({

          title:
            title.trim(),

          game:
            game.trim(),

          description:
            description.trim(),

          date:
            new Date(date),

          price:
            numericPrice,

          totalSeats:
            numericSeats,

          availableSeats:
            numericSeats

        });


      res
        .status(201)
        .json({

          success: true,

          message:
            'Tournament created successfully',

          tournament

        });


    } catch (error) {

      console.error(
        'Create tournament error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while creating tournament'

        });

    }

  };


// =====================================================
// UPDATE TOURNAMENT
// =====================================================

const updateTournament =
  async (req, res) => {

    try {

      const {
        id
      } = req.params;


      if (
        !mongoose.isValidObjectId(id)
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
        await Tournament.findById(id);


      if (!tournament) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              'Tournament not found'

          });

      }


      const {
        title,
        game,
        description,
        date,
        price,
        totalSeats
      } = req.body;


      if (
        !title ||
        !game ||
        !description ||
        !date ||
        price === undefined ||
        totalSeats === undefined
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Please provide all tournament fields'

          });

      }


      const numericPrice =
        Number(price);


      const numericSeats =
        Number(totalSeats);


      const reservedSeats =
        tournament.totalSeats -
        tournament.availableSeats;


      if (
        numericPrice < 0 ||
        numericSeats < 1
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Price and total seats must be valid positive values'

          });

      }


      if (
        numericSeats < reservedSeats
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              `Total seats cannot be lower than ${reservedSeats} because those seats are already reserved`

          });

      }


      tournament.title =
        title.trim();

      tournament.game =
        game.trim();

      tournament.description =
        description.trim();

      tournament.date =
        new Date(date);

      tournament.price =
        numericPrice;

      tournament.totalSeats =
        numericSeats;

      tournament.availableSeats =
        numericSeats -
        reservedSeats;


      await tournament.save();


      res
        .status(200)
        .json({

          success: true,

          message:
            'Tournament updated successfully',

          tournament

        });


    } catch (error) {

      console.error(
        'Update tournament error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while updating tournament'

        });

    }

  };


// =====================================================
// DELETE TOURNAMENT
// =====================================================

const deleteTournament =
  async (req, res) => {

    try {

      const {
        id
      } = req.params;


      if (
        !mongoose.isValidObjectId(id)
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
        await Tournament.findById(id);


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
        await Ticket.exists({

          tournament:
            tournament._id

        });


      if (existingTicket) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'This tournament cannot be deleted because ticket records already exist'

          });

      }


      await tournament.deleteOne();


      res
        .status(200)
        .json({

          success: true,

          message:
            'Tournament deleted successfully'

        });


    } catch (error) {

      console.error(
        'Delete tournament error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while deleting tournament'

        });

    }

  };

// =====================================================
// GET ALL SUPPORT MESSAGES
// =====================================================

const getSupportMessages =
  async (req, res) => {

    try {

      const supportMessages =
        await SupportMessage
          .find({})
          .sort({
            createdAt: -1
          });


      return res
        .status(200)
        .json({

          success: true,

          count:
            supportMessages.length,

          supportMessages

        });


    } catch (error) {

      console.error(
        'Get support messages error:',
        error.message
      );


      return res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while retrieving support messages'

        });

    }

  };

// =====================================================
// UPDATE SUPPORT MESSAGE STATUS
// =====================================================

const updateSupportStatus =
  async (req, res) => {

    try {

      const {
        id
      } = req.params;


      const {
        status
      } = req.body;


      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Invalid support message ID'

          });

      }


      if (
        status !== 'OPEN' &&
        status !== 'RESOLVED'
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Status must be OPEN or RESOLVED'

          });

      }


      const supportMessage =
        await SupportMessage.findById(
          id
        );


      if (!supportMessage) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              'Support message not found'

          });

      }


      supportMessage.status =
        status;


      await supportMessage.save();


      return res
        .status(200)
        .json({

          success: true,

          message:
            `Support message marked as ${status}`,

          supportMessage

        });


    } catch (error) {

      console.error(
        'Update support status error:',
        error
      );


      return res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while updating support message'

        });

    }

  };

module.exports = {

  checkAdminAccess,

  createTournament,

  updateTournament,

  deleteTournament,

  getSupportMessages,

  updateSupportStatus

};