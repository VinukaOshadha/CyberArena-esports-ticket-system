const User =
  require('../models/User');


// =====================================================
// Get Leaderboard
// =====================================================

const getLeaderboard =
  async (req, res) => {

    try {

      const users =
        await User.find()

          .select(
            'name playerId points wins'
          )

          .sort({
            points: -1,
            wins: -1
          })

          .limit(20);


      const leaderboard =
        users.map(
          (user, index) => ({

            rank:
              index + 1,

            id:
              user._id,

            name:
              user.name,

            playerId:
              user.playerId,

            points:
              user.points || 0,

            wins:
              user.wins || 0

          })
        );


      res
        .status(200)
        .json({

          success: true,

          count:
            leaderboard.length,

          leaderboard

        });


    } catch (error) {

      console.error(
        'Leaderboard error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while retrieving leaderboard'

        });

    }

  };


module.exports = {
  getLeaderboard
};