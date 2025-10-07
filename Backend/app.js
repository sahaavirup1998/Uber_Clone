const dotenv = require('dotenv');
dotenv.config();
const express = require ('express');
const cors = require('cors');
const app = express();
const cookieparser = require('cookie-parser');
const connectToDb = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
const captainRoutes = require('./routes/captain.routes.js');
const mapsRoute = require('./routes/maps.routes.js');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoute);

module.exports = app;