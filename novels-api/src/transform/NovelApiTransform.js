// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class NovelApiTransform {
  static transform(novel) {
    const { Genre, _count, Author, tags } = novel;
    return {
      id: novel?.id,
      title: novel?.title,
      description: novel?.description,
      slug: novel?.slug,
      status: novel?.status,
      props: novel?.props,
      nominate: novel?.nominate,
      covers: novel?.covers,
      createdAt: novel?.createdAt,
      updatedAt: novel?.updatedAt,
      converterId: novel?.converterId,
      ...(tags && {
        tags: tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
		  type: tag.type,
        })),
      }),
      genre: Genre
        ? {
            id: Genre?.id,
            name: Genre?.name,
          }
        : null,
      author: {
        id: Author?.id,
        name: Author?.name,
      },
      _count: {
        comments: _count?.comments,
        reviews: _count?.reviews,
        favorites: _count?.favoriteBy,
        chapters: _count?.chapters,
        words: novel?.words,
        views: novel?.views,
      },
    };
  }
}
export default NovelApiTransform;
