const jwt =
  require('jsonwebtoken');

const User =
  require('../models/User');


// =====================================================
// PROTECT AUTHENTICATED ROUTES
// =====================================================

const protect =
  async (req, res, next) => {

    try {

      let token;


      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
          'Bearer '
        )
      ) {

        token =
          req.headers.authorization
            .split(' ')[1];
      }


      if (!token) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              'Not authorized. Token is missing.'

          });
      }


      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );


      const user =
        await User
          .findById(
            decoded.id
          )
          .select(
            '-password'
          );


      if (!user) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              'User associated with this token was not found.'

          });
      }


      req.user = user;


      next();


    } catch (error) {

      return res
        .status(401)
        .json({

          success: false,

          message:
            'Not authorized. Invalid or expired token.'

        });
    }
  };


// =====================================================
// ADMIN ONLY
// =====================================================

const adminOnly =
  (req, res, next) => {

    if (
      !req.user ||
      req.user.role !== 'ADMIN'
    ) {

      return res
        .status(403)
        .json({

          success: false,

          message:
            'Admin access required.'

        });
    }


    next();
  };


module.exports = {

  protect,

  adminOnly

};