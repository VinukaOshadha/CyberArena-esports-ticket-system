const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Ticket = require('../models/Ticket');


// =====================================================
// GENERATE JWT
// =====================================================

const generateToken = (userId) => {

  return jwt.sign(
    {
      id: userId
    },

    process.env.JWT_SECRET,

    {
      expiresIn: '7d'
    }
  );
};


// =====================================================
// GENERATE UNIQUE PLAYER ID
// =====================================================

const generatePlayerId =
  async (name) => {

    const cleanName =
      name
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .substring(0, 10) || 'PLAYER';


    let playerId;
    let alreadyExists = true;


    while (alreadyExists) {

      const randomNumber =
        Math.floor(
          1000 +
          Math.random() * 9000
        );


      playerId =
        `${cleanName}-${randomNumber}`;


      alreadyExists =
        await User.exists({
          playerId
        });
    }


    return playerId;
  };


// =====================================================
// REGISTER USER
// =====================================================

const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;


      if (
        !name ||
        !email ||
        !password
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              'Please provide name, email and password'
          });
      }


      if (
        name.trim().length < 3
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              'Name must contain at least 3 characters'
          });
      }


      if (
        !email.includes('@')
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              'Please provide a valid email address'
          });
      }


      if (
        password.length < 6
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              'Password must contain at least 6 characters'
          });
      }


      const normalizedEmail =
        email
          .trim()
          .toLowerCase();


      const existingUser =
        await User.findOne({
          email: normalizedEmail
        });


      if (existingUser) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              'User already exists with this email'
          });
      }


      const playerId =
        await generatePlayerId(
          name
        );


      const user =
        await User.create({

          name:
            name.trim(),

          email:
            normalizedEmail,

          password,

          playerId

        });


      res
        .status(201)
        .json({

          success: true,

          message:
            'Registration successful',

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            playerId:
              user.playerId,

            role:
              user.role,

            points:
              user.points,

            wins:
              user.wins

          },

          token:
            generateToken(
              user._id
            )

        });


    } catch (error) {

      console.error(
        'Registration error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error during registration'

        });
    }
  };


// =====================================================
// LOGIN USER
// =====================================================

const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;


      if (
        !email ||
        !password
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Please provide email and password'

          });
      }


      const user =
        await User.findOne({

          email:
            email
              .trim()
              .toLowerCase()

        });


      if (
        !user ||
        !(await user.matchPassword(password))
      ) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              'Invalid email or password'

          });
      }


      res
        .status(200)
        .json({

          success: true,

          message:
            'Login successful',

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            playerId:
              user.playerId,

            role:
              user.role || 'PLAYER',

            points:
              user.points || 0,

            wins:
              user.wins || 0

          },

          token:
            generateToken(
              user._id
            )

        });


    } catch (error) {

      console.error(
        'Login error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error during login'

        });
    }
  };


// =====================================================
// GET CURRENT LOGGED-IN USER
// =====================================================

const getMe =
  async (req, res) => {

    try {

      const [
        totalTickets,
        activeTickets,
        cancelledTickets
      ] = await Promise.all([

        Ticket.countDocuments({
          user: req.user._id
        }),

        Ticket.countDocuments({
          user: req.user._id,
          status: 'RESERVED'
        }),

        Ticket.countDocuments({
          user: req.user._id,
          status: 'CANCELLED'
        })

      ]);


      res
        .status(200)
        .json({

          success: true,

          user: {

            id:
              req.user._id,

            name:
              req.user.name,

            email:
              req.user.email,

            playerId:
              req.user.playerId,

            role:
              req.user.role || 'PLAYER',

            points:
              req.user.points || 0,

            wins:
              req.user.wins || 0,

            createdAt:
              req.user.createdAt

          },


          stats: {

            totalTickets,

            activeTickets,

            cancelledTickets

          }

        });


    } catch (error) {

      console.error(
        'Get user error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while retrieving user profile'

        });
    }
  };


module.exports = {

  registerUser,

  loginUser,

  getMe

};