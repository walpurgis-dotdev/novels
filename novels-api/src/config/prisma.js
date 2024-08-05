import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";
import retry from "retry";

const prisma = new PrismaClient().$extends(
	pagination({
		pages: {
			limit: 10,
			includePageCount: true,
		},
	}),
);

function connectWithRetry(client) {
	const operationOptions = {
		retries: 5, // Số lần thử lại
		factor: 3, // Hệ số nhân cho thời gian chờ giữa các lần thử
		minTimeout: 1000, // Thời gian chờ tối thiểu giữa các lần thử (ms)
		maxTimeout: 60000, // Thời gian chờ tối đa giữa các lần thử (ms)
		randomize: true, // Ngẫu nhiên hóa thời gian chờ giữa các lần thử
	};

	const retryOperation = retry.operation(operationOptions);

	retryOperation.attempt(async (currentAttempt) => {
		try {
			await client.$connect();
			console.log("Kết nối đến cơ sở dữ liệu thành công!");
		} catch (error) {
			console.error(
				`Lỗi kết nối đến cơ sở dữ liệu (lần thử ${currentAttempt}):`,
				error,
			);
			if (retryOperation.retry(error)) {
				return;
			}
			console.error(
				"Không thể kết nối đến cơ sở dữ liệu sau các lần thử:",
				error,
			);
		}
	});
}

connectWithRetry(prisma);

export default prisma;
