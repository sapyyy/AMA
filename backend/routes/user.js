const { Router } = require("express");
const { Ama } = require("../db/mongo");
const { Admin } = require("../db/mongo");
const router = Router();

// router to find the required admin
router.get("/ama/:id", async (req, res) => {
  const id = req.params.id;
  const found = await Admin.findOne({ _id: id });

  if (found) {
    res.status(200).json({ status: "Admin Found" });
  } else {
    res.status(400).json({ status: "Admin not found" });
  }
});

// router to post question's to the admin
router.post("/ama-post/:id", async (req, res) => {
  const id = req.params.id;
  const question = req.body.question;
  const found = await Admin({ _id: id });

  if (found) {
    // now based on the id, push to the questions
    await Ama.updateOne(
      { admin: id },
      {
        $push: {
          questions: question,
        },
      }
    );
    res.status(200).json({ status: "Question created successfully" });
  } else {
    res.status(400).json({ status: "Admin not found" });
  }
});

module.exports = router;
