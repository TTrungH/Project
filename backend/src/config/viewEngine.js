const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
    console.log(path.join("./src/", "public"));

    app.use(express.static(path.join("./src/", "public")));
};

module.exports = configViewEngine;
