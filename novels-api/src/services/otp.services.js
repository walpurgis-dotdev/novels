import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
async function countOtpByEmail(email) {
	return await prisma.otps.count({
		where: {
			email,
		},
	});
}

async function createOtp({ email, otp }) {
	// hash otp
	const salt = bcrypt.genSaltSync(10);
	const hashOtp = bcrypt.hashSync(otp, salt);
	const expires = new Date();
	expires.setMinutes(expires.getMinutes() + 30); // 30 minutes
	const susses = await prisma.otps.create({
		data: {
			email,
			otp: hashOtp,
			expires,
		},
	});
	return !!susses;
}

async function getOtpByEmail(email) {
	return await prisma.otps.findFirst({
		where: {
			email,
		},
	});
}

async function deleteOtpById(id) {
	return await prisma.otps.delete({
		where: {
			id,
		},
	});
}

async function verifyOtp({ email, otp }) {
	const findOtp = await getOtpByEmail(email);
	if (!findOtp) {
		return false;
	}
	if (findOtp.expires < new Date()) {
		return false;
	}
	const isMatch = bcrypt.compareSync(otp, findOtp.otp);
	if (!isMatch) {
		return false;
	}
	// delete otp
	await deleteOtpById(findOtp.id);
	return true;
}

export { countOtpByEmail, createOtp, getOtpByEmail, verifyOtp };
