const express =
  require('express');


const {
  getTournaments,
  createTournament
} = require(
  '../controllers/tournamentController'
);


const router =
  express.Router();


// Get all tournaments
router.get(
  '/',
  getTournaments
);


// Create tournament
router.post(
  '/',
  createTournament
);


module.exports = router;