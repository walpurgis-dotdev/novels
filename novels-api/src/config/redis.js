import { Redis } from "ioredis";
import "dotenv/config";
import {
   REDIS_CONNECT_TIMEOUT,
   statusConnectRedis,
} from "../utils/constants.js";

let client;

let connectTimeout;

const handleTimeoutError = () => {
   connectTimeout = setTimeout(() => {
      console.log(REDIS_CONNECT_MESSAGE);
   }, REDIS_CONNECT_TIMEOUT);
};

const handleEventConnection = ({ connectionRedis }) => {
   connectionRedis.on(statusConnectRedis.CONNECT, () => {
      console.log("Redis connected");
      clearTimeout(connectTimeout);
   });
   connectionRedis.on(statusConnectRedis.ERROR, (error) => {
      console.log("Redis error", error);
      handleTimeoutError();
   });
   connectionRedis.on(statusConnectRedis.END, () => {
      handleTimeoutError();
   });
   connectionRedis.on(statusConnectRedis.RECONNECT, () => {
      console.log("Redis reconnecting");
      clearTimeout(connectTimeout);
   });
};

const initRedis = () => {
   client = new Redis(process.env.REDIS_URL);
   handleEventConnection({ connectionRedis: client });
};

const getRedis = () => {
   if (!client) {
      initRedis();
   }
   return client;
};

const closeRedis = () => {
   client.quit();
};

export { initRedis, getRedis, closeRedis };
