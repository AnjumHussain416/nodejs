const { name } = require("ejs");
const moongoose = require("mongoose");
const connect = moongoose.connect(
  "mongodb+srv://anjumhussain230:binubinu@cluster.dcb3k.mongodb.net/backend_collection"
);

connect
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB:");
  });

const userSchema = new moongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new moongoose.model("user", userSchema);

module.exports = collection;
