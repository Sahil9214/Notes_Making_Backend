const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/notes.route");

const app = express();
app.use(express.json());
app.use("/auth", userRouter);
app.use("/note", noteRouter);
const Port = process.env.PORT || 3000;
app.listen(Port, async (req, res) => {
  try {
    await connection;
    console.log(`${Port} is running`);
  } catch (err) {
    res.status(400).send({ msg: "error in connection" });
  }
});
