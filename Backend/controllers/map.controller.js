const { validationResult } = require('express-validator');
const mapService = require('../services/map.services.js');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
	const { address } = req.query;
    try {
		const coordinates = await mapService.getAddressCoordinate(address);
		return res.status(200).json(coordinates);
		
	} catch (err) {
		return res.status(404).json({ message: 'Failed to get coordinates' });
	}
};
