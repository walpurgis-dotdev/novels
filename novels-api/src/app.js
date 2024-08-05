import path, { join } from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import logger from "morgan";
import { corsOptions } from "./config/cors.js";
import { rateLimitMiddleware } from "./middleware/RateLimit.js";
import { errorHandlingMiddleware } from "./middleware/errorHandling.js";
import route from "./router/index.js";

const app = express();
const __dirname = path.resolve();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(fileUpload());
app.use(express.static(join(__dirname, "public")));

// limiter
app.use(rateLimitMiddleware);

route(app);

app.use(errorHandlingMiddleware);
export default app;
