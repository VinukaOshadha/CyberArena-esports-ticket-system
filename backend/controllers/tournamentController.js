const Tournament =
  require('../models/Tournament');


// =====================================================
// Get All Tournaments
// =====================================================

const getTournaments =
  async (req, res) => {

    try {

      const tournaments =
        await Tournament.find()
          .sort({
            date: 1
          });


      res
        .status(200)
        .json({

          success: true,

          count:
            tournaments.length,

          tournaments:
            tournaments

        });


    } catch (error) {

      console.error(
        'Get tournaments error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while retrieving tournaments'

        });

    }

  };


// =====================================================
// Create Tournament
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
        totalSeats,
        image
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
              'Please provide all required tournament fields'

          });

      }


      const tournament =
        await Tournament.create({

          title,

          game,

          description,

          date,

          price,

          totalSeats,

          availableSeats:
            totalSeats,

          image:
            image || ''

        });


      res
        .status(201)
        .json({

          success: true,

          message:
            'Tournament created successfully',

          tournament:
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


module.exports = {

  getTournaments,

  createTournament

};