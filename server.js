const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, 'dist')));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budget',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(() => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.log(error);
});

// routes
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});