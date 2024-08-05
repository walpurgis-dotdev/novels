class ProfileApiTransform {
   static transform(user) {
      const { level, nextLevel, ...userData } = user;
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
         createdAt: user?.createdAt,
         updatedAt: user?.updatedAt,
         level: {
            id: currentLevel?.id,
            name: currentLevel?.name,
            points: user?.points,
            nextLevelPoints: nextLevelData?.pointRequire || 0,
            nextLevelName: nextLevelData?.name || "Thiên Đạo",
         },
      };
   }
}
export default ProfileApiTransform;
