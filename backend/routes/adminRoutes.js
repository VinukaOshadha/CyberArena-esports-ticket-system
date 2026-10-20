const express =
  require('express');


const {
  checkAdminAccess
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


router.get(
  '/check',
  protect,
  adminOnly,
  checkAdminAccess
);


module.exports = router;