import authMiddleware from "../middleware/Authenticate.js";
import VerifyDataMiddleware from "../middleware/VerifyData.js";
import verifySignature from "../middleware/VerifySignature.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
import analyticsRouter from "./analytics.routes.js";
import authRouter from "./auth.routes.js";
import authorRouter from "./author.routes.js";
import chapterRouter from "./chapter.routes.js";
import rateRouter from "./chapterRate.routes.js";
import commentRouter from "./comment.routes.js";
import donateRouter from "./donate.routes.js";
import genreRouter from "./genre.routes.js";
import noticeRouter from "./notice.routes.js";
import novelRouter from "./novel.routes.js";
import reactionRouter from "./reaction.routes.js";
import readingsRouter from "./reading.routes.js";
import reviewRouter from "./review.routes.js";
import tagRouter from "./tag.routes.js";
import userRouter from "./user.routes.js";
import "dotenv/config";
function route(app) {
	app.use(VerifyDataMiddleware);
	// app.use(verifySignature);
	app.use(getUserFromToken);
	app.use("/novels", novelRouter);
	app.use("/auth", authRouter);
	app.use("/users", userRouter);
	app.use("/tags", tagRouter);
	app.use("/genres", genreRouter);
	app.use("/review", authMiddleware, reviewRouter);
	app.use("/chapters", chapterRouter);
	app.use("/rate", authMiddleware, rateRouter);
	app.use("/reaction", authMiddleware, reactionRouter);
	app.use("/comments", commentRouter);
	app.use("/authors", authorRouter);
	app.use("/donates", authMiddleware, donateRouter);
	app.use("/notice", authMiddleware, noticeRouter);
	app.use("/readings", authMiddleware, readingsRouter);
	app.use("/analytics", authMiddleware, analyticsRouter);

	app.use("/", async (req, res, next) => {
		res.json({
			message: "😒😏🥲🙄😒😒😒😒",
		});
	});
}

export default route;
