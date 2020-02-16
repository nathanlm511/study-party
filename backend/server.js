const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Location = require('./models/Location');

const API_PORT = 3001;
const app = express();
app.use(cors());

const passport = require("passport");
const users = require("./routes/api/users");
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://admin:123@cluster0-rcl0k.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


// this is our get method
// this method fetches all available data in our database
router.get('/getLocation', (req, res) => {
  Location.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateLocation', (req, res) => {
  const { id, update } = req.body;
  Location.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteLocation', (req, res) => {
  const { id } = req.body;
  Location.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putLocation', (req, res) => {
  let location = new Location();

  const { id, lat, long, Class, cap } = req.body;

  // VALIDATE INPUTS HERE
  if ((!id && id !== 0)) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  location.id = id;
  location.lat = lat;
  location.long = long;
  location.class = Class;
  location.cap = cap;
  location.partying = 0;
  location.save((err) => {
    if (err) return res.json({ success: false, error: err, id: location._id  });
    return res.json({ success: true, id: location._id  });
  });
});

// Routes
app.use("/api/users", users);

// append /api for our http requests
app.use('/api', router);


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));