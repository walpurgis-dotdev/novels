import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

class Logger {
	constructor() {
		const formatPrint = format.printf(
			({ level, message, context, requestId, timestamp }) => {
				return `${timestamp} [${level}] [${requestId}] [${context}] ${message}`;
			},
		);

		this.logger = createLogger({
			format: format.combine(
				format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				formatPrint,
			),
			transports: [
				new transports.Console(),
				new transports.DailyRotateFile({
					dirname: "logs",
					filename: "app-%DATE%.info.log",
					datePattern: "YYYY-MM-DD",
					zippedArchive: true,
					maxFiles: "14d",
					maxSize: "20m",
					format: format.combine(
						format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
						formatPrint,
					),
					level: "info",
				}),
				new transports.DailyRotateFile({
					dirname: "logs",
					filename: "app-%DATE%.error.log",
					datePattern: "YYYY-MM-DD",
					zippedArchive: true,
					maxFiles: "14d",
					maxSize: "20m",
					format: format.combine(
						format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
						formatPrint,
					),
					level: "error",
				}),
			],
		});
	}

	log(message, params) {
		const logObject = Object.assign({ message }, params);
		this.logger.info(logObject);
	}
}

export default new Logger();
