const express =
  require('express');


const {
  reserveTicket,
  getMyTickets,
  cancelTicket
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


// Reserve ticket
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


// Cancel ticket
router.patch(
  '/cancel/:ticketId',
  protect,
  cancelTicket
);


module.exports = router;