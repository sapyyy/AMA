const mongoose = require("mongoose");

// connecting to the db
mongoose.connect(process.env.MONGO_URI);

// defining schema's for admin
const Admin = mongoose.model("Admin", {
  email: String,
  password: String,
});

// defining the schema for the Ama
const Ama = mongoose.model("Ama", {
  questions: [String],
  username: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = {
  Admin,
  Ama,
};
