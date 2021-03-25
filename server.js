const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, 'dist')));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budgettracker',
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
app.use(require("./routes/api.js"));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});