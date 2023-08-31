const express = require("express");
const image = require("../Middleware/multer");

const router = express.Router();
const {
  createForm,
  findAll,
  findOne,
  deleteData,
} = require("../Controller/formController");

router.post("/createForm", image, createForm);
router.get("/getAllData", findAll);
router.get("/getOneData/:id", findOne);
router.delete("/getOneDataAndDelete/:id", deleteData);
module.exports = router;
