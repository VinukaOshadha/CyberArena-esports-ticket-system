const express = require('express');

const {
  reserveTicket,
  getMyTickets,
  cancelTicket,
} = require('../controllers/ticketController');

const {
  protect,
} = require('../middleware/authMiddleware');

const router = express.Router();


// GET logged-in user's tickets
router.get(
  '/my',
  protect,
  getMyTickets
);


// Reserve ticket
router.post(
  '/reserve/:tournamentId',
  protect,
  reserveTicket
);


// Cancel ticket
router.patch(
  '/cancel/:ticketId',
  protect,
  cancelTicket
);


module.exports = router;