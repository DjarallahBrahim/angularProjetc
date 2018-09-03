//SERVER EXPRESS
const express = require('express');
//import model
const Rental = require('../models/rental');
//import userCtrl
const UserCtrl = require('../controllers/userControler');

const router = express.Router();

router.get('/secret',UserCtrl.authMiddleware, (req, res)=>{
    res.json({"Secret":true});
  
});

router.get('', (req, res)=>{
  Rental.find({})
      .select('-bookings')
      .exec(function(err, rentalsFound){
         res.json(rentalsFound);
      });
});

router.get('/:id', (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId)
      .populate('user','userName -_id')
      .populate('bookings', 'startAt endAt -_id')
      .exec(function (err, rentalFound){
              if(err){
                  res.status(422).send({errors : [{title: "Rental Error", detail: "Could not find Rental"}]});
              }
              else
                  res.json(rentalFound);
    });
});

module.exports = router ;
