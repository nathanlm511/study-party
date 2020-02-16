// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const LocationSchema = new Schema(
  {
    id: Number,
    lat: Number,
    long: Number,
    class: String,
    cap: Number,
    partying: Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Location", LocationSchema);