const { check } = require("express-validator");

exports.signUpValidation = [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Email is required"),
];
