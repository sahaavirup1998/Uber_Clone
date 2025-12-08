const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const mapController = require('../controllers/map.controller.js');
const { query } = require('express-validator');

// ✅ GET /get-coordinate?address=Kolkata
router.get(
  '/get-coordinate',
  [
    query('address')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Address must be at least 3 characters long')
  ],
  authMiddleware.authUser, // verify user token or session
  mapController.getCoordinates // controller handles API logic
);

router.get(
  '/get-distance-time',
  [
    query('origin')
      .isString()
      .isLength({ min: 3 }),
    query('destination')
      .isString()
      .isLength({ min: 3 })
  ],
  authMiddleware.authUser,
  mapController.getDistanceAndTime
);

router.get(
  '/get-suggestions',
  [
    query('input')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Input must be at least 3 characters long')
  ],
  authMiddleware.authUser,
  mapController.getSuggestions
);

module.exports = router;
