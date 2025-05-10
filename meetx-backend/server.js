const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const auth = require('./routes/auth');
const activities = require('./routes/activities');
const bookings = require('./routes/bookings');

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

app.use('/api/auth', auth);
app.use('/api/activities', activities);
app.use('/api/bookings', bookings);

app.get('/', (req, res) => {
  res.send('API is running...');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 