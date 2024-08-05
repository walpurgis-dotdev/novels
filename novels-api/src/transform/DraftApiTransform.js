// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class DraftApiTransform {
	static transform(novels) {
		const transformedNovels = novels.map((novel) => {
			const { tags, Author } = novel;

			return {
				id: novel?.id,
				title: novel?.title,
				description: novel?.description,
				slug: novel?.slug,
				status: novel?.status,
				props: novel?.props,
				isPublished: novel?.isPublished,
				nominate: novel?.nominate,
				originalLink: novel?.originalLink,
				orginalName: novel?.orginalName,
				genreId: novel?.genreId,
				covers: novel?.covers,
				createdAt: novel?.createdAt,
				updatedAt: novel?.updatedAt,
				Author: {
					id: Author?.id,
					name: Author?.name,
				},

				tags: tags.map((tag) => {
					return {
						id: tag?.id,
						name: tag?.name,
						type: tag?.type,
					};
				}),
			};
		});
		return transformedNovels;
	}
}

export default DraftApiTransform;
