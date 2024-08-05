import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

async function addToBlacklist(token) {
	try {
		const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const expiryDate = new Date(user.exp * 1000);

		// Thêm token vào blacklist
		const blacklistEntry = await prisma.blacklist.create({
			data: {
				userId: user.userId,
				token: token,
				expiryDate: expiryDate,
			},
		});

		return blacklistEntry;
	} catch (err) {
		console.error("ERROR VERIFY JWT:", err.message);
		return null;
	}
}

async function isTokenBlacklisted(token) {
	const result = await prisma.blacklist.findUnique({
		where: {
			token,
		},
	});
	return result !== null;
}

export { addToBlacklist, isTokenBlacklisted };
