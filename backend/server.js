const express =
  require('express');

const cors =
  require('cors');

const dotenv =
  require('dotenv');

const helmet =
  require('helmet');


const connectDB =
  require('./config/db');


dotenv.config();


connectDB();


const app =
  express();


const PORT =
  process.env.PORT ||
  5000;


// =====================================================
// SECURITY
// =====================================================

app.disable(
  'x-powered-by'
);


app.use(
  helmet()
);


app.use(
  cors({

    origin:
      process.env.FRONTEND_URL ||
      'http://localhost:5173',

    methods: [
      'GET',
      'POST',
      'PATCH',
      'PUT',
      'DELETE'
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ]

  })
);


// Limit JSON request body size

app.use(
  express.json({
    limit: '10kb'
  })
);


// =====================================================
// ROUTES
// =====================================================

app.get(
  '/',
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        'CyberArena API is running'

    });

  }
);


app.get(
  '/api/health',
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        'CyberArena backend is healthy'

    });

  }
);


app.use(
  '/api/auth',
  require('./routes/authRoutes')
);


app.use(
  '/api/tournaments',
  require('./routes/tournamentRoutes')
);


app.use(
  '/api/tickets',
  require('./routes/ticketRoutes')
);


app.use(
  '/api/leaderboard',
  require('./routes/leaderboardRoutes')
);


app.use(
  '/api/support',
  require('./routes/supportRoutes')
);


app.use(
  '/api/admin',
  require('./routes/adminRoutes')
);


// =====================================================
// API 404
// =====================================================

app.use(
  '/api',
  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        'API route not found'

    });

  }
);


// =====================================================
// SERVER ERROR HANDLER
// =====================================================

app.use(
  (error, req, res, next) => {

    console.error(
      'Server error:',
      error.message
    );


    if (
      error.type ===
      'entity.too.large'
    ) {

      return res
        .status(413)
        .json({

          success: false,

          message:
            'Request body is too large'

        });

    }


    return res
      .status(
        error.status ||
        500
      )
      .json({

        success: false,

        message:
          'Internal server error'

      });

  }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
  PORT,
  () => {

    console.log(
      `CyberArena server running on port ${PORT}`
    );

  }
);