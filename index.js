const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require("cors");
const port = process.env.PORT || 8000;
require('dotenv').config();
const profileRouter = require("./route/profileRouter");

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use("/", profileRouter);

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
