const express =
  require('express');


const {
  reserveTicket,
  getMyTickets
} = require(
  '../controllers/ticketController'
);


const {
  protect
} = require(
  '../middleware/authMiddleware'
);


const router =
  express.Router();


// Reserve tournament ticket
router.post(
  '/reserve/:tournamentId',
  protect,
  reserveTicket
);


// Get logged-in user's tickets
router.get(
  '/my',
  protect,
  getMyTickets
);


module.exports = router;