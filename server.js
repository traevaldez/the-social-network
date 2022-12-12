const express = require('express');
const db = require('./config/connection');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost/the-social-network',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// Use this to log mongo queries being executed!
// mongoose.set('debug', true);
// moved to connection
// app.listen(PORT, () => console.log(`🌍 Connected on http://localhost:${PORT}/`));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}/`);
  });
});