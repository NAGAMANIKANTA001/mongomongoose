require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const PersonSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model("Person",PersonSchema);

const createAndSavePerson = (done) => {
  let document = new Person({name:"Nagamanikanta",age:22,favoriteFoods:["Biryani","Pizza"]})
  document.save((err,data)=>{
    if(err) {
      done(err)
    } else {
      done(null,data)
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create([...arrayOfPeople],(err,data)=>{
    if(err) {
      done(err)
    } else {
      done(null,data)
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if(err) {
      done(err)
    } else {
      done(null,data)
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err) {
      done(err)
    } else {
      done(null,data)
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=>{
    if(err) {
      done(err)
    } else {
      done(null,data)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,person)=>{
    person.favoriteFoods.push(foodToAdd)
    person.save((err,savedPerson)=>{
      if(err) {
        done(err)
      } else {
        done(null,savedPerson)
      }
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
    if(err) {
      done(err)
    } else {
      done(null,data)
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data)=> {
    if(err) {
      done(err)
    } else {
      done(null,data)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,response)=>{
    if(err) {
      done(err)
    } else {
      done(null,response)
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec((err,data)=>{
    if(err) {
      done(err)
    } else {
      console.log(data)
      done(null,data)
    }
  })
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
