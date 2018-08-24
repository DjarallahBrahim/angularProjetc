//import config
const config = require('./config/dev');
//SERVER EXPRESS
const express = require('express');
//MONGOOS DATABASE
const mongoose = require('mongoose');
//Mongoos Model rentalSchema
const Rental = require('./models/rental');
//Fake data rentals
const FakeDb = require('./fake-db');
//rentals routes
const rentalsRoutes = require('./routes/rentals');

mongoose.connect(config.DB_url).then( () =>{
  const fakeDb = new FakeDb();
  fakeDb.seeDbPromes();
}, (err)=>{
  console.log(err);
});

const app = express();

const PORT = process.env.PORT || 3001;

//ROUTES
app.use('/api/v1/rentals', rentalsRoutes);

app.listen(3001,()=>{
  console.log("Server ON ...");
})
