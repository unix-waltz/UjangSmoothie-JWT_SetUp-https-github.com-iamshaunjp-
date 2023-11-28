const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/auth-routes')
const cookie_parser = require('cookie-parser')
const { requireAuth, checkUser } = require('./Middleware/authMiddleware');

const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookie_parser());

app.set('view engine', 'ejs');


const dbURI = 'mongodb://localhost:27017/jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

  app.get('*', checkUser);
  app.use(authRoutes)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
