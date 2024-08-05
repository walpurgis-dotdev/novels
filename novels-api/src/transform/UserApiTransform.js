class UserApiTransform {
   static transform(user) {
      const { level, nextLevel, _count, history, ...userData } = user;
      const currentLevel = level;
      const nextLevelData = nextLevel
         ? {
              id: nextLevel.id,
              name: nextLevel.name,
              pointRequire: nextLevel.pointRequire,
           }
         : null;
      return {
         id: user?.id,
         name: user?.name,
         email: user?.email,
         prefix: user?.prefix,
         avatar: user?.avatar,
         bio: user?.bio,
         birthday: user?.birthday,
         flowers: user?.flowers,
         money: user?.money,
         isBlocked: user?.isBlocked,
         role: user?.role,
         isVerified: user?.isVerified,
         count: {
            comments: _count?.comments,
            votes: _count?.Votes,
            convertedNovels: _count?.convertedNovels,
            reactions: _count?.reactions,
            likes: _count?.likedNovels,
            reviews: _count?.reviewNovels,
         },
         readings: history,
         level: {
            id: currentLevel?.id,
            name: currentLevel?.name,
            points: user?.points,
            nextLevelPoints: nextLevelData?.pointRequire || 0,
            nextLevelName: nextLevelData?.name || "Thiên Đạo",
         },
         createdAt: user?.createdAt,
         updatedAt: user?.updatedAt,
      };
   }
}
export default UserApiTransform;
