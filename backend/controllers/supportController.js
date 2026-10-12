const SupportMessage =
  require('../models/SupportMessage');


// =====================================================
// Create Support Message
// =====================================================

const createSupportMessage =
  async (req, res) => {

    try {

      const {
        name,
        email,
        message
      } = req.body;


      // Check empty fields
      if (
        !name ||
        !email ||
        !message
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Please provide name, email and message'

          });

      }


      // Name validation
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


      // Email validation
      if (
        !email.includes('@')
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Please enter a valid email address'

          });

      }


      // Message validation
      if (
        message.trim().length < 10
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              'Message must contain at least 10 characters'

          });

      }


      const supportMessage =
        await SupportMessage.create({

          name,

          email,

          message

        });


      res
        .status(201)
        .json({

          success: true,

          message:
            'Support message submitted successfully',

          supportMessage: {

            id:
              supportMessage._id,

            name:
              supportMessage.name,

            email:
              supportMessage.email,

            status:
              supportMessage.status,

            createdAt:
              supportMessage.createdAt

          }

        });


    } catch (error) {

      console.error(
        'Support message error:',
        error.message
      );


      res
        .status(500)
        .json({

          success: false,

          message:
            'Server error while submitting support message'

        });

    }

  };


module.exports = {
  createSupportMessage
};