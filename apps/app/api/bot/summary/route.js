import { SummaryFetch } from "@/services/bot.service";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request) {
	const body = await request.json();
	const abortController = new AbortController();
	const signal = abortController.signal;
	const data = await SummaryFetch(body, signal);
	const stream = data.body;

	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();
	const reader = stream.getReader();

	const textDecoder = new TextDecoder();
	let buffer = "";

	async function processStream() {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			buffer += textDecoder.decode(value, { stream: true });
			const lines = buffer.split("\n");

			for (let i = 0; i < lines.length - 1; i++) {
				const line = lines[i].trim();

				if (line.startsWith("data:")) {
					const chunkObj = JSON.parse(line.slice(5).trim());

					if (
						chunkObj.event === "message" &&
						chunkObj.message.type === "answer"
					) {
						const chunkContent = chunkObj.message.content;

						if (chunkContent !== "") {
							writer.write(
								`${JSON.stringify({
									content: chunkContent,
									done: false,
								})}\n\n`,
							);
						}
					} else if (chunkObj.event === "done") {
						writer.write(`${JSON.stringify({ done: true })}\n\n`);
						await writer.close();
						return;
					}
				}
			}

			buffer = lines[lines.length - 1];
		}
	}

	processStream().catch(async (error) => {
		await writer.close();
		abortController.abort();
		reader.cancel();
	});

	return new NextResponse(readable, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
}
