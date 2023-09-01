const Form = require("../Model/formModel");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const path = require("path");
const imagepath = path.join("uplodes");
const fs = require("fs");
// CREATE FORM

exports.createForm = catchAsyncErrors(async (req, res) => {
  try {
    console.log("file", req.file.filename);
    console.log("req.body", req.body);
    let imagePath = `${imagepath}/${req.file.filename}`;
    console.log("imagePath", imagePath);
    console.log("imagepath", imagepath);
    console.log("req.file.filename", req.file.filename);
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      hobbies,
      gender,
      state,
      age,
      address,
      city,
      pinCode,
      country,
    } = req.body;
    const newForm = new Form({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      hobbies,
      gender,
      state,
      age,
      address,
      city,
      pinCode,
      country,
      images: imagePath,
    });
    console.log(newForm);

    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// FIND ALL DATA

exports.findAll = catchAsyncErrors(async (req, res) => {
  try {
    const form = await Form.find();
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// FIND ONE DATA

exports.findOne = catchAsyncErrors(async (req, res) => {
  try {
    const id = req.params.id;
    const dataForm = await Form.findById(id);

    if (!dataForm) {
      return res.status(404).json({ error: "Form is not found" });
    }

    res.json(dataForm);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DATA DELETE

exports.deleteData = catchAsyncErrors(async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Form.findByIdAndRemove(id);

    if (!user) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.json({ message: "Form removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
