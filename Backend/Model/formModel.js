const mongoose = require("mongoose");
const validator = require("validator");

const formSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      // minlength: [3, "Name must be at least 3 characters"],
      // maxlength: [10, "Name cannot exceed 10 characters"],
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      // minlength: [5, "Name must be at least 3 characters"],
      // maxlength: [15, "Name cannot exceed 10 characters"],
    },
    email: {
      type: String,
      // required: [true, "Pleace Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Pleace Enter a validetor Email"],
    },
    phone: {
      type: String,
      required: true,
      // unique: true,
      // validate: {
      //   validator: function (value) {
      //     return /^\d{10}$/g.test(value);
      //   },
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
    },
    gender: {
      type: String,
      // required: [true, "Pleace Enter Gender"],
      enum: ["male", "female"],
    },
    hobbies: {
      type: String,
      // required: [true, "Pleace Enter Hobby"],
      // enum: ["traveling", "reading", "cooking"],
    },
    dateOfBirth: {
      // required: [true, "Pleace Enter Your DateofBirth"],
      type: Number,
    },
    images: {
      // required: [true, "Pleace Enter Your Profile"],s
      type: String,
    },
    age: {
      // required: [true, "Pleace Enter Your Age"],
      type: Number,
      min: 18,
      max: 100,
    },
    state: {
      // required: [true, "Pleace Enter Your State"],
      type: String,
    },
    city: {
      type: String,
      // required: [true, "Pleace Enter Your City"],
    },
    country: {
      type: String,
      // required: [true, "Pleace Enter Your country"],
    },
    pinCode: {
      type: Number,
      // required: [true, "Pleace Enter Your pinCode"],
    },
    address: {
      type: String,
      required: [true, "Pleace Enter Your Addresss"],
    },
  },
  { timestamps: true }
);
const Form = mongoose.model("Form", formSchema);

module.exports = Form;
