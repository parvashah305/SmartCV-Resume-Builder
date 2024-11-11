const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  personal: {
    name: String,
    email: String,
    phone: Number,
    website: String,
    github: String,
    instagram: String,
  },
  education: [{
    degree: String,
    institution: String,
    year: Number,
    grade:String,
  }],
  experiences: [{
    company: String,
    role: String,
    description: String,
    startdate:String,
    enddate:String,
  }],
  projects: [{
    title: String,
    description: String,
    link: String,
  }],
  skills: [{
    skill: String,
    proficiency: String,
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;