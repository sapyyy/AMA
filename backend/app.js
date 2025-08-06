const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(
  cors({
    origin: "https://ama-virid.vercel.app",
  })
);
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "Server is running fine!" });
});

app.use((req, res) => {
  res.status(400).json({ status: "Bad Request" });
});

app.listen(process.env.PORT, () => {
  console.log("The server is running on port : ", process.env.PORT);
});
