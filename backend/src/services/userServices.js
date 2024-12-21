const db = require("../models/index");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { formatDate } = require("../utils/formats");
const { where, Op } = require("sequelize");
const { raw } = require("mysql2");
const jwt = require("jsonwebtoken");
const saltRounds = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const createNewUser = async ({
  username,
  password,
  firstName,
  lastName,
  email,
  groupId,
}) => {
  console.log(">>>>>>db: ", db.Users);
  try {
    const [result, recorded] = await db.Users.findOrCreate({
      where: { username: username },
      defaults: {
        username: username,
        password: hashPassword(password),
        email: email,
        firstName: firstName,
        lastName: lastName,
        groupId: groupId,
      },
    });
    if (recorded) {
      return { message: "A user was created successfully" };
    }
    return { message: "user contained" };
  } catch (error) {
    console.log(error);
    message = "create user failed";
  }
};

const getUserById = async (id) => {
  try {
    //Test relationship
    const result = await db.Users.findAll({
      where: {
        id: id,
      },
      nest: true,
      include: {
        model: db.Groups,
        raw: true,
        attributes: ["name", "description"],
      },
      attributes: [
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    });
    console.log(">>>>> result: ", result);

    if (result) {
      console.log(">>>>>>>>>>>>date: ", formatDate(result[0].updatedAt));
      return { message: "get user succesfully", result: result };
    }

    return { message: "get user fail" };
  } catch (error) {
    console.log(error);
    return { message: "get user fail" };
  }
};

const createNewGroup = async ({ name, description }) => {
  try {
    const [result, recorded] = await db.Groups.findOrCreate({
      where: { name: name },
      defaults: {
        name: name,
        description: description,
      },
    });
    if (recorded) {
      return { message: "group was created successfully" };
    }
    return { message: "group contained" };
  } catch (error) {
    console.log(error);
    message = "create group failed";
  }
};

const get_all_users = async () => {
  try {
    const result = await db.Users.findAll({
      include: {
        model: db.Groups,
        required: false,
        raw: true,
        // nested: true,
      },
      attributes: ["id", "username", "email", "createdAt", "updatedAt"],
    });
    return { message: "get all users succesfully", result: result };
  } catch (error) {
    return { message: "get users fail" };
  }
};



const auth_user = async ({ username, password }) => {
  try {

    const accessToken = jwt.sign( { "username": username, "password": password }
     ,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: 60 }
    );
    const result = await db.Users.findOne({
      where: {
        username: username,
      },
    });
    if (result) {
      const check = bcrypt.compareSync(password, result.password);
      if (check) {
        return {
          message: "login successfully",
          result: result.get({ plain: true }),
          token: accessToken,
        };
      }
      return { message: "login fail" };
    }
    return { message: "login fail" };
  } catch (error) {
    console.log(error);
    return { message: "login fail" };
  }
};

const delete_user = async (id) => {
  try {
    const result = await db.Users.destroy({
      where: {
        id: id,
      },
    });

    console.log(">>>>>result: ", result);

    if (result) {
      return { message: "delete user successfully" };
    }
    return { message: "delete user fail" };
  } catch (error) {
    console.log(error);
    return { message: "delete user fail" };
  }
};

const update_user = async ({
  id,
  username,
  password,
  email,
  firstName,
  lastName,
}) => {
  try {
    let result = await db.Users.findOne({
      where: {
        id: id,
      },
    });
    if (!result) {
      return { message: "user not found" };
    }
    console.log(">>>>>result: ", result);
    result.set({
      username: username ? username : result.username,
      password: password ? hashPassword(password) : result.password,
      email: email ? email : result.email,
      firstName: firstName ? firstName : result.firstName,
      lastName: lastName ? lastName : result.lastName,
    });

    console.log(">>>>>result: ", result);

    result = await result.save();
    console.log(">>>>>last result: ", result);

    if (result) {
      return { message: "update user successfully" };
    }
    return { message: "update user fail" };
  } catch (error) {
    console.log(error);
    return { message: "update user fail" };
  }
};

module.exports = {
  createNewUser,
  getUserById,
  createNewGroup,
  get_all_users,
  auth_user,
  delete_user,
  update_user,
};
