const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port =  5000;
const userRouter = require("./Routes/auth");
const recipeRouter = require("./Routes/reciper");

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
app.use(cors({
   origin: ["https://zulqarnain-recipe-app.vercel.app/"],
   methods: ["GET", "POST"],
   credentials: true,
}))

app.use(cookieParser());
app.use(express.json());
//nichay wali line pr ma jo likhonga wohi
//frontend pr likhna ho ga i.e, /auth and /recipe
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

mongoose
  .connect(
    "mongodb+srv://zulqarnain:chohan@cluster0.fi4j6s3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected sucessfully");
  })
  .catch(() => {
    console.log("N0 connection");
  });


app.listen(port, () => {
  console.log("server is running at port 5000");
});
