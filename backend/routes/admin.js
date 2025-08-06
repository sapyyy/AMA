const { Router } = require("express");
const { Admin } = require("../db/mongo");
const { Ama } = require("../db/mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middlewares/admin");
const router = Router();
const SECRET = process.env.SECRET;

// route to signup admin
router.post("/signup", async (req, res) => {
  email = req.body.email;
  password = req.body.password;

  // hashing using bcrypt
  hashpass = await bcrypt.hash(password, 10);

  // check for existing user
  const existingUser = await Admin.findOne({ email });

  if (existingUser) {
    res.status(401).json({ status: "Email already exists" });
  } else {
    // creating an username for the user
    const username = email.split("@")[0];

    // creating an user
    await Admin.create({ email: email, password: hashpass });

    // creating an ama schema for the admin
    const user = await Admin.findOne({ email });
    await Ama.create({
      question: [],
      username: username,
      admin: user._id,
    });
    res.status(200).json({ status: "Admin registered successfully" });
  }
});

// route to sign in admin
router.post("/signin", async (req, res) => {
  email = req.body.email;
  password = req.body.password;

  // check if there is an registered user
  const found = await Admin.findOne({ email });

  if (found) {
    const isMatch = bcrypt.compare(password, found.password);

    if (isMatch) {
      const token = jwt.sign({ email: email }, SECRET);
      res
        .status(200)
        .json({ status: "Logged In", token: token, id: found._id });
    } else {
      res.status(401).json({ status: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ status: "Admin not registered" });
  }
});

// router to get all the ama's posted for the admin
router.get("/amas", adminMiddleware, async (req, res) => {
  const id = req.headers.id;
  const values = await Ama.find({ admin: id });
  res
    .status(200)
    .json({ questions: values[0].questions, username: values[0].username });
});

// router to delete all the amas at once
router.delete("/amas", adminMiddleware, async (req, res) => {
  try {
    const id = req.headers.id;
    // delete all the questions by the admin id
    const result = await Ama.updateOne({ admin: id }, { questions: [] });
    res.status(200).json({ status: "Sucessfully deleted all the amas" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: err });
  }
});

module.exports = router;
