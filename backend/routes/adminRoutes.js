const express =
  require('express');


const {

  checkAdminAccess,

  createTournament,

  updateTournament,

  deleteTournament,

  getSupportMessages,

  updateSupportStatus

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


// =====================================================
// ADMIN CHECK
// =====================================================

router.get(
  '/check',
  protect,
  adminOnly,
  checkAdminAccess
);


// =====================================================
// TOURNAMENT MANAGEMENT
// =====================================================

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


// =====================================================
// SUPPORT MANAGEMENT
// =====================================================

router.get(
  '/support',
  protect,
  adminOnly,
  getSupportMessages
);


router.patch(
  '/support/:id/status',
  protect,
  adminOnly,
  updateSupportStatus
);


module.exports =
  router;