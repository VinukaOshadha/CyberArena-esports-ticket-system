// =====================================================
// ADMIN ACCESS CHECK
// =====================================================

const checkAdminAccess =
  async (req, res) => {

    try {

      res
        .status(200)
        .json({

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


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while checking admin access'

        });
    }
  };


module.exports = {
  checkAdminAccess
};