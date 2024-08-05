import jwt from "jsonwebtoken";
import "dotenv/config.js";
const getUserFromToken = (req, res, next) => {
   const authHeader = req.headers.Authorization;
   if (authHeader === null || authHeader === undefined) {
      return next();
   }

   const token = authHeader.split(" ")[1];
   console.log(token);
   // verify token
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
         return next();
      }
      req.userId = user?.userId;
      next();
   });
};

export default getUserFromToken;
