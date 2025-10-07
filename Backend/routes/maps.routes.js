const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const mapController = require('../controllers/map.controller.js');
const { query } = require('express-validator')

router.get('/get-coordinate',
    query('address').isString().isLength({ min: 3 }),authMiddleware.authUser, mapController.getCoordinates)


module.exports = router;