const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth_token = (req, res, next) => {
  try {
    const authorizationHeader =  req.headers.authorization;
    console.log(">>>>>>Authorization::", req.headers.authorization);
    
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      res.sendStatus(401);
    }
    console.log(">>>>>Private key::",process.env.ACCESS_TOKEN_SECRET_KEY);
    
    jwt.verify(authorizationHeader, process.env.ACCESS_TOKEN_SECRET_KEY, (err, data) => {
      if (err) {
        console.log("s>>>>>>> error: ", err );
       return res.sendStatus(403);
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

module.exports = { auth_token };
