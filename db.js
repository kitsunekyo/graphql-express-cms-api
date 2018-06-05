const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/papi');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});