const express =
  require('express');


const {
  getTournaments
} = require(
  '../controllers/tournamentController'
);


const router =
  express.Router();


// Public tournament list
router.get(
  '/',
  getTournaments
);


module.exports =
  router;