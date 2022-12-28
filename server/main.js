// setup dotenv
require('dotenv').config()

// setup express
const express = require("express");
const app = express();
const morgan = require("morgan");
const fileUpload = require('express-fileupload');

// setup database
const sqlite3 = require('sqlite3').verbose();
const path = process.env.DATABASE ?? "database.db";
const db = new sqlite3.Database(path);

// Auth Middleware
//const authmiddleware = require("./middlewares/auth")(db);

// Logging
app.use(morgan('dev'));

//fileupload handling default
app.use(fileUpload())

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT ?? 3000;

app.use("/upload", require("./routes/upload")(db));

app.listen(port, () =>
    console.log(`Listening on Port: ${port}`)
);