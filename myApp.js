require('dotenv').config();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI || process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const {Schema} = mongoose
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: Array,
})
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Elliot",
    age: "33",
    favoriteFoods: ["Pizza", "Sour Gummy Worms", "Dirt"],
  })
  person.save(function(err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
};

let arrayOfPeople = [
  {
    name: "Journey",
    age: 9,
    favoriteFoods: ["Noodles", "Pizza"]
  },
  {
    name: "Boston",
    age: 7,
    favoriteFoods: ["Pizza", "Spaghetti"]
  },
  {
    name: "Lennux",
    age: 4,
    favoriteFoods: ["Buttered Noodles", "Peanut Butter and Jelly", "Fruit Snacks"]
  }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err)
    let p = data
    p.favoriteFoods.push(foodToAdd)
    p.markModified('favoriteFoods')
    p.save(function(err, data) {
      if (err) return console.error(err)
      done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, data) {
    if (err) return console.log(err)
    done(null, data)
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
