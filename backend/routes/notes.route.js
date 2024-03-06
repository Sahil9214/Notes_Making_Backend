const express = require("express");
const noteRouter = express.Router();
const { noteModal } = require("../model/note.model");
const { tokenDecoder } = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");

require("dotenv").config();
noteRouter.use(tokenDecoder);
//getRequest;
noteRouter.get("/get", async (req, res) => {
  try {
    // console.log("Decoded***", decoded);
    let email = req.email;
    let user = await noteModal.find({ email });
    res.status(200).send({ msg: user });
  } catch (err) {
    res
      .status(400)
      .send({ msg: err, Description: "Enable to send Get request in notes" });
  }
});

//add Request ---> Post Request;

noteRouter.post("/add", async (req, res) => {
  let { title, description } = req.body;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .send({ msg: "Please fill title and description data first" });
    }

    let email = req.email;
    console.log("email", email);
    let dataAdded = new noteModal({ ...req.body, email });

    await dataAdded.save();
    res.status(200).send({ msg: "Data Added Success", dataAdded });
  } catch (err) {
    res.status(400).send({ msg: err, Description: "Enable to post Request" });
  }
});

//search Request;

noteRouter.get("/search", async (req, res) => {
  let { userQuery } = req.query;
  let email = req.email;

  try {
    if (!userQuery) {
      return res.status(400).send({ msg: "UserQuery Dalana bul gaya bhai" });
    } else {
      const searchResults = await noteModal.find({
        email,
        $or: [
          { title: { $regex: userQuery, $options: "i" } },
          { description: { $regex: userQuery, $options: "i" } },
        ],
      });
      res.status(200).send({ msg: "Search Results", data: searchResults });
    }
  } catch (err) {
    res
      .status(400)
      .send({ msg: err, Description: "Cannot search there is some error" });
  }
});

module.exports = { noteRouter };
