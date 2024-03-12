const mongoose = require("mongoose");

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
   title: String,
   role: String,
   description: String,
   duration: String,
   location: String,
   workingType: String,
   company: String,
   dates: String,
   salary: String,
   status: String,
   endDate: String,
   urlPdf: String,
   reference: String,
   isSignatureReady: String,
});

const identitySchema = mongoose.Schema({
  name: String,
  firstName: String,
  birthDate: String,
  nationality: String,
  countryBirth: String,
  familySituation: String,
  birthTown: String,
  birthDistrict: String,
  socialSecurityNumber: Number,
  phoneNumber: Number,
  
})

const addressSchema = mongoose.Schema({
  street: String,
  zipCode: String,
  city: String,
  country: String,
})

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  token: String,
  inscriptionDate: Date,
  identity: identitySchema,
  addresses: addressSchema,
  contracts: [contractSchema],
  salary: [salarySchema],
  parameters: parametersSchema,
  identityCard: String,
  vitalCard: String,
  resume: String,
  iban: String,
  homePaper: String,
})

const User = mongoose.model("users", userSchema);

module.exports = User;
