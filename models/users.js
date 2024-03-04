const mongoose = require('mongoose');

const parametersSchema = mongoose.Schema({
  email: Boolean,
  notification: Boolean,
  sms: Boolean,
  importantNotifications: Boolean,
  informations: Boolean,
});

const salarySchema = mongoose.Schema({
  dates: String,
  salary: Number,
  urlPdf: String,
});

const contractSchema = mongoose.Schema({
  company: String,
  contractReferences: String,
  date: Date,
  hourlyPaid: Number,
  rank: String,
  urlPdf: String,
});

const identitySchema = mongoose.Schema({
  name: String,
  firstName: String,
  birthDate: Date,
  birthZipCode: Number,
  phoneNumber: Number,
  familySituation: String,
  zipCode: Number,
  city: String,
  country: String,
});

const addressSchema = mongoose.Schema({
  street: String,
  zipCode: Number,
  city: String,
  country: String,
});

const userSchema = mongoose.Schema({
  identity: identitySchema,
  addresses: addressSchema,
  contracts: [contractSchema], 
  salary: [salarySchema],
  parameters: parametersSchema,
  identityCard: String,
  vitalCard: String,
  cv: String,
  iban: String,
  homePaper: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;