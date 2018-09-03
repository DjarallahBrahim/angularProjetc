//import config
const config = require('./config/dev');
//SERVER EXPRESS
const express = require('express');
//Body parser
const bodyParse = require('body-parser');
//MONGOOS DATABASE
const mongoose = require('mongoose');
//Mongoos Model rentalSchema
const Rental = require('./models/rental');
//Fake data rentals
const FakeDb = require('./fake-db');
//rentals routes
const rentalsRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');
const bookinfRoutes = require('./routes/bookings');

mongoose.connect(config.DB_url,{ useNewUrlParser: true }).then( () =>{
  const fakeDb = new FakeDb();
  //fakeDb.seeDb();
}, (err)=>{
  console.log(err);
});

const app = express();

const PORT = process.env.PORT || 3001;
//Body parser
app.use(bodyParse.json());
//ROUTES
app.use('/api/v1/rentals', rentalsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/bookings', bookinfRoutes);


app.listen(3001,()=>{
  console.log("Server ON ...");
})
