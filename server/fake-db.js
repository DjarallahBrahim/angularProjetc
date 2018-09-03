const Rental = require('./models/rental');
const User = require('./models/user');


class FakeDb{

  constructor(){
    this.rentals = [{
                  title: "Nice view on ocean",
                  city: "San Francisco",
                  street: "Main street",
                  category: "condo",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 4,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 43
                  },
                  {
                  title: "Modern apartment in center",
                  city: "New York",
                  street: "Time Square",
                  category: "apartment",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 1,
                  shared: false,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 11
                  },
                  {
                  title: "Old house in nature",
                  city: "Spisska Nova Ves",
                  street: "Banicka 1",
                  category: "house",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 5,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 23
}];
    this.user = [{
          userName: "Test User",
          email: "test@gmail.com",
          password: "testest"
        },
        {
            userName: "Test User1",
            email: "test1@gmail.com",
            password: "testest1"
        }];
  }

  async cleanDB(){
    await User.remove({});
    await Rental.remove({});
  }

  //cleanDB with promes
  cleanDb_promes(){
    return new Promise( (resolve,reject) => {
      Rental.remove({}, () => resolve());

    });
  }

  pushDataRToDb(){
    const user = new User(this.user[0]);
    const user1 = new User(this.user[1]);

    this.rentals.forEach((rental)=>{
      const newRental = new Rental(rental);
      //Relation with rentals and user
      newRental.user = user;
      user.rentals.push(newRental);

      newRental.save();
    });
    user.save();
    user1.save();
  }

  async seeDb(){
    await this.cleanDB();
    this.pushDataRToDb();
  }


  seeDbPromes(){
    this.cleanDb_promes().then( () => {
      this.pushRantelsToDb();
    }, (err) => {
        console.log(err);
      });
  }
}

module.exports =  FakeDb ;
