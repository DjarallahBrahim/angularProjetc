//SERVER EXPRESS
const express = require('express');
//import model
const Rental = require('../models/rental');

const router = express.Router();

router.get('', (req, res)=>{
  Rental.find({}, (err, rentalsFound) => {
     res.json(rentalsFound);
  });
});

router.get('/:id', (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId,(err, rentalFound) => {
      if(err){
        res.status(422).send({errors : [{title: "Rental Error", detail: "Could not find Rental"}]});
      }else  res.json(rentalFound);
    });
});

module.exports = router ;
