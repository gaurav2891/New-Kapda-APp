const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;

mongoose
  // .connect(
  //   "mongodb://localhost:27017/kapdaBazar",
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("Database connected Succesfully"))
  .catch((err) =>
    console.log("🧯🧯Got error in connection of databse 🧯🧯 ", err)
  );

app.listen(port, () => {
  console.log(
    `app running on ${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_BACKEND_URL
        : process.env.PROD_BACKEND_URL
    } `,
    `on PORT => ${process.env.PORT}`
  );
  console.log("ENVOROMENT => ", process.env.NODE_ENV);
});
