const express =
  require('express');


const {
  createSupportMessage
} = require(
  '../controllers/supportController'
);


const router =
  express.Router();


// Submit support message
router.post(
  '/',
  createSupportMessage
);


module.exports = router;