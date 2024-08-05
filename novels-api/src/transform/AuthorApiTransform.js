class AuthorApiTransform {
   static transform(author) {
      const defaultCover =
         "https://cdn.domestika.org/raw/upload/assets/projects/project-default-cover-1248c9d991d3ef88af5464656840f5534df2ae815032af0fdf39562fee08f0a6.svg";

      const transformedNovels = author.novels?.map((novel) => {
         const { Genre, _count } = novel;

         return {
            id: novel.id,
            title: novel.title,
            description: novel.description,
            slug: novel.slug,
            covers: novel.covers,
            nominate: novel.nominate,
            genre: Genre
               ? {
                    id: Genre.id,
                    name: Genre.name,
                    description: Genre.description,
                 }
               : null,
            views: _count.views,
            chapters: _count.chapters,
            vote: _count.Vote,
         };
      });

      return {
         id: author.id,
         name: author.name,
         novels: transformedNovels || [],
      };
   }
}

export default AuthorApiTransform;
