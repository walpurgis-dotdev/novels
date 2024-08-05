export const ADMIN = "ADMIN";
export const MOD = "MOD";
export const USER = "USER";
export const BLOCKUSER = "USER_BLOCK";
export const UPDATEUSER = "USER_UPDATE";
export const DELETEUSER = "USER_DELETE";
export const GETDRAFT = "USER_DRAFT";
export const ERROR_MESSAGE = {
   SERVER_ERROR: "Loi he thong, vui long thu lai sau.",
   FORBIDDEN: "Ban khong co quyen truy cap.",
};

export const supportedMimes = [
   "image/jpg",
   "image/jpeg",
   "image/png",
   "image/gif",
   "image/webp",
   "image/svg",
];

export const statusConnectRedis = {
   CONNECT: "connect",
   ERROR: "error",
   END: "end",
   RECONNECT: "reconnecting",
};

export const REDIS_CONNECT_TIMEOUT = 10000;

export const _7DAY = 7 * 24 * 60 * 60;
export const _3DAY = 3 * 24 * 60 * 60;

export const SKIPLIMIT = 20;

export const WHITELIST_DOMAINS = ["http://localhost:3000"];

export const avatarSizes = [60, 90, 160, 300];
export const coverSizes = [
   {
      width: 150,
      height: 200,
   },
   {
      width: 300,
      height: 400,
   },
   {
      width: 600,
      height: 800,
   },
];
