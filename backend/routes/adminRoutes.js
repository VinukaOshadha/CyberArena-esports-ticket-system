const express =
  require('express');


const {

  checkAdminAccess,

  createTournament,

  updateTournament,

  deleteTournament

} = require(
  '../controllers/adminController'
);


const {

  protect,

  adminOnly

} = require(
  '../middleware/authMiddleware'
);


const router =
  express.Router();


// All routes below require:
// 1. Valid JWT
// 2. ADMIN role


router.get(
  '/check',
  protect,
  adminOnly,
  checkAdminAccess
);


router.post(
  '/tournaments',
  protect,
  adminOnly,
  createTournament
);


router.patch(
  '/tournaments/:id',
  protect,
  adminOnly,
  updateTournament
);


router.delete(
  '/tournaments/:id',
  protect,
  adminOnly,
  deleteTournament
);


module.exports =
  router;