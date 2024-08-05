export const SummaryFetch = async ({ id, content }, signal) => {
	try {
		const response = await fetch("https://api.coze.com/open_api/v2/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer pat_d7qZs8rxGUomEcXsn5hO5Cfgk1y2z9Q7TE3bQwDSzFnH2WjWRRJk7FMcfZr1Ln8z",
				Host: "api.coze.com",
				Connection: "keep-alive",
				Accept: "*/*",
			},
			body: JSON.stringify({
				conversation_id: id,
				bot_id: "7374297663203852305",
				user: "2313131",
				query: content,
				stream: true,
			}),
			signal,
		});
		return response;
	} catch (error) {
		console.log("Loi khi goi API tóm tắt chương", error.message);
		return null;
	}
};
