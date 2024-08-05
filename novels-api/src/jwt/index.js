import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRedis } from "../config/redis.js";
import "dotenv/config";
import { _3DAY, _7DAY } from "../utils/constants.js";
import ApiError from "../utils/ApiError.js";
const client = getRedis();

const signAccessToken = async (payload) => {
   try {
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: _3DAY,
      });
      return token;
   } catch (err) {
      console.error("ERROR SIGN JWT:", err.message);
      throw new ApiError(500, "Internal Server Error");
   }
};

const signRefreshToken = async (payload) => {
   try {
      const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
         expiresIn: _7DAY,
      });
      await client.set(`refresh_token:${payload.userId}`, token, "EX", _7DAY);

      return token;
   } catch (err) {
      console.error("ERROR SIGN JWT:", err.message);
      throw new ApiError(500, "Internal Server Error");
   }
};

async function comparePassword(password, hashPassword) {
   try {
      const isMatch = await bcrypt.compare(password, hashPassword);
      return isMatch;
   } catch (err) {
      console.error("ERROR COMPARE PASSWORD:", err.message);
      throw new ApiError(500, "Internal Server Error");
   }
}

async function verifyRefreshToken(refreshToken) {
   try {
      const payload = jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
      );

      const isValid = await validateRefreshTokenPayload(
         payload?.userId,
         refreshToken,
      );

      if (!isValid) {
         return null;
      }

      return payload;
   } catch (err) {
      console.error("ERROR VERIFY REFRESH TOKEN:", err.message);
      if (err.name === "TokenExpiredError") {
         throw new ApiError(401, "Unauthorized");
      } else {
         throw new ApiError(500, "Internal Server Error");
      }
   }
}

async function validateRefreshTokenPayload(userId, refreshToken) {
   const storedToken = await client.get("refresh_token:" + userId);
   return storedToken === refreshToken; // Check if stored token matches the incoming one
}

async function removeRefreshToken(userId) {
   await client.del("refresh_token:" + userId);
} // Remove the refresh token from the Redis store
export {
   signAccessToken,
   comparePassword,
   signRefreshToken,
   verifyRefreshToken,
   removeRefreshToken,
};
