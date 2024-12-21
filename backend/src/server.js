//import config dotenv ==>>> to use ".evn" file
require("dotenv").config();

//import express
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

// use express
const app = express();

//config cors
// const corsOption = {
//     origin: 'http://10.0.2.16',
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
// }
app.use(cors());

// import view engine
const configViewEngine = require("./config/viewEngine");

// import api book
const apiBookRoutes = require("./routes/apiBook");

// import api user
const apiUserRoutes = require("./routes/apiUser");

// import api chapter
const apiChapterRoutes = require("./routes/apiChapter");

// assign hostname and port of database connection
const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

// config req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use view engine
configViewEngine(app);

// use api book routes
app.use("/v1/api/book", apiBookRoutes);

// use api user routes
app.use("/v1/api/user", apiUserRoutes);

// use api chapter routes
app.use("/v1/api/chapter", apiChapterRoutes);

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});
