const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require("cors");
const port = process.env.PORT || 8000;
require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.listen(port, () => {
  console.log(`The app is listening at port ${port}`);
});
