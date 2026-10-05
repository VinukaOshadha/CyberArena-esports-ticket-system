const jwt = require('jsonwebtoken');
const User = require('../models/User');


// =====================================================
// Generate JWT Token
// =====================================================

const generateToken = (userId) => {

  return jwt.sign(
    {
      id: userId
    },

    process.env.JWT_SECRET,

    {
      expiresIn: '30d'
    }
  );

};


// =====================================================
// Generate Unique Player ID
// =====================================================

const generatePlayerId = async (name) => {

  const cleanName =
    name
      .trim()
      .split(' ')[0]
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 8);

  const prefix =
    cleanName || 'PLAYER';

  let playerId;
  let alreadyExists = true;


  while (alreadyExists) {

    const number =
      Math.floor(
        1000 + Math.random() * 9000
      );

    playerId =
      `${prefix}-${number}`;

    alreadyExists =
      await User.exists({
        playerId: playerId
      });

  }


  return playerId;
};


// =====================================================
// Register User
// =====================================================

const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;


      // Check empty fields
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


      // Password validation
      if (password.length < 6) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Password must contain at least 6 characters'

          });

      }


      // Check existing user
      const userExists =
        await User.findOne({

          email:
            email
              .toLowerCase()
              .trim()

        });


      if (userExists) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'User already exists with this email'

          });

      }


      // Generate Player ID
      const playerId =
        await generatePlayerId(name);


      // Create user
      const user =
        await User.create({

          name,

          email,

          password,

          playerId

        });


      res
        .status(201)
        .json({

          success: true,

          message:
            'User registered successfully',

          user: {

            id: user._id,

            name: user.name,

            email: user.email,

            playerId:
              user.playerId

          }

        });


    } catch (error) {

      console.error(
        'Registration error:',
        error
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            error.message

        });

    }

  };


// =====================================================
// Login User
// =====================================================

const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;


      // Check empty fields
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


      // Find user
      const user =
        await User.findOne({

          email:
            email
              .toLowerCase()
              .trim()

        });


      // User not found
      if (!user) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              'Invalid email or password'

          });

      }


      // Check password
      const passwordMatches =
        await user.matchPassword(
          password
        );


      if (!passwordMatches) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              'Invalid email or password'

          });

      }


      // Generate JWT
      const token =
        generateToken(user._id);


      // Successful login
      res
        .status(200)
        .json({

          success: true,

          message:
            'Login successful',

          user: {

            id: user._id,

            name: user.name,

            email: user.email,

            playerId:
              user.playerId

          },

          token: token

        });


    } catch (error) {

      console.error(
        'Login error:',
        error
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
// Exports
// =====================================================

module.exports = {

  registerUser,

  loginUser

};