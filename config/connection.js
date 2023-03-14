const { connect, connection } = require('mongoose');

//Establishes the connection to local installation of mongodb and the database that this application uses.
connect('mongodb://localhost:27017/socialMango', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
