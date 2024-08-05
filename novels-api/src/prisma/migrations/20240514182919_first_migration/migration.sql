-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MOD');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CARD', 'MOMO', 'ZALO', 'BANK', 'KHAC', 'PAYPAL');

-- CreateEnum
CREATE TYPE "NovelProps" AS ENUM ('CHATLUONGCAO', 'CHONLOC');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('TRUNGLAP', 'KHIEUDAM', 'CHINHTRI', 'KHAC');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONGOING', 'COMPLETED', 'PAUSED');

-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('CHARACTER', 'WORLD', 'FACTION', 'SIGHT');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD');

-- CreateEnum
CREATE TYPE "NoticeType" AS ENUM ('ADMINMESSAGE', 'NEWCHAPTER', 'SYSTEMMESSAGE');

-- CreateTable
CREATE TABLE "Blacklist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adapter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProps" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userProps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "prefix" TEXT,
    "email" VARCHAR(191) NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "birthday" TIMESTAMP(3),
    "flowers" INTEGER NOT NULL DEFAULT 0,
    "money" INTEGER NOT NULL DEFAULT 0,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "points" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "levelId" INTEGER,
    "avatar" JSONB,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otps" (
    "id" SERIAL NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,

    CONSTRAINT "Otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentFrom" "PaymentType" NOT NULL DEFAULT 'KHAC',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authors" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "originalName" VARCHAR(200) NOT NULL,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Levels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "pointRequire" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Novels" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "slug" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ONGOING',
    "props" "NovelProps",
    "nominate" BOOLEAN NOT NULL DEFAULT false,
    "isSold" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "converterId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "originalName" TEXT NOT NULL,
    "originalLink" TEXT NOT NULL,
    "approvedById" TEXT,
    "genreId" INTEGER NOT NULL,
    "covers" JSONB,

    CONSTRAINT "Novels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Views" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "novelId" TEXT,
    "chapterId" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "ReportType" NOT NULL DEFAULT 'KHAC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "novelId" TEXT,
    "chapterId" TEXT,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "novelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "novelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapters" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chapterNo" INTEGER NOT NULL,
    "novelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countWords" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingChapters" (
    "id" SERIAL NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "RatingChapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "TagType" NOT NULL DEFAULT 'CHARACTER',

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "novelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "chapterId" TEXT,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reactions" (
    "id" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL DEFAULT 'LIKE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "Reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "character" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "plot" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "world" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL,
    "spoiler" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "likedById" TEXT,
    "novelId" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chapterId" TEXT,
    "title" TEXT NOT NULL,
    "type" "NoticeType" NOT NULL DEFAULT 'NEWCHAPTER',

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "reward" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserPermissions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserAdapter" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UsersTouserProps" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteNovels" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_novelsTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PurchasedChapters" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LikedComments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserNotices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserReadNotices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssignedTasks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_token_key" ON "Blacklist"("token");

-- CreateIndex
CREATE INDEX "Blacklist_token_idx" ON "Blacklist"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_name_key" ON "Permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Adapter_name_key" ON "Adapter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "userProps_name_key" ON "userProps"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Otps_otp_key" ON "Otps"("otp");

-- CreateIndex
CREATE INDEX "Otps_otp_idx" ON "Otps"("otp");

-- CreateIndex
CREATE INDEX "Otps_email_idx" ON "Otps"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Authors_name_key" ON "Authors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Authors_originalName_key" ON "Authors"("originalName");

-- CreateIndex
CREATE INDEX "Authors_name_originalName_idx" ON "Authors"("name", "originalName");

-- CreateIndex
CREATE UNIQUE INDEX "Authors_name_originalName_key" ON "Authors"("name", "originalName");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_name_key" ON "Levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Novels_title_key" ON "Novels"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Novels_slug_key" ON "Novels"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Novels_orginalName_key" ON "Novels"("originalName");

-- CreateIndex
CREATE UNIQUE INDEX "Novels_originalLink_key" ON "Novels"("originalLink");

-- CreateIndex
CREATE INDEX "Novels_title_idx" ON "Novels"("title");

-- CreateIndex
CREATE INDEX "Novels_orginalName_originalLink_idx" ON "Novels"("originalName", "originalLink");

-- CreateIndex
CREATE UNIQUE INDEX "Novels_title_authorId_key" ON "Novels"("title", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Novels_id_converterId_key" ON "Novels"("id", "converterId");

-- CreateIndex
CREATE UNIQUE INDEX "Novels_orginalName_originalLink_key" ON "Novels"("originalName", "originalLink");

-- CreateIndex
CREATE UNIQUE INDEX "Donations_novelId_userId_createdAt_key" ON "Donations"("novelId", "userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Votes_novelId_userId_createdAt_key" ON "Votes"("novelId", "userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Votes_novelId_userId_key" ON "Votes"("novelId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Chapters_novelId_chapterNo_key" ON "Chapters"("novelId", "chapterNo");

-- CreateIndex
CREATE UNIQUE INDEX "RatingChapters_chapterId_userId_key" ON "RatingChapters"("chapterId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "History_userId_novelId_chapterId_key" ON "History"("userId", "novelId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_name_key" ON "Genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "CommentNovel" ON "Comments"("id", "novelId");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_userId_key" ON "Comments"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reactions_userId_chapterId_key" ON "Reactions"("userId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_novelId_userId_key" ON "Reviews"("novelId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPermissions_AB_unique" ON "_UserPermissions"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPermissions_B_index" ON "_UserPermissions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserAdapter_AB_unique" ON "_UserAdapter"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAdapter_B_index" ON "_UserAdapter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UsersTouserProps_AB_unique" ON "_UsersTouserProps"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersTouserProps_B_index" ON "_UsersTouserProps"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteNovels_AB_unique" ON "_FavoriteNovels"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteNovels_B_index" ON "_FavoriteNovels"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_novelsTags_AB_unique" ON "_novelsTags"("A", "B");

-- CreateIndex
CREATE INDEX "_novelsTags_B_index" ON "_novelsTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PurchasedChapters_AB_unique" ON "_PurchasedChapters"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchasedChapters_B_index" ON "_PurchasedChapters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedComments_AB_unique" ON "_LikedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedComments_B_index" ON "_LikedComments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserNotices_AB_unique" ON "_UserNotices"("A", "B");

-- CreateIndex
CREATE INDEX "_UserNotices_B_index" ON "_UserNotices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserReadNotices_AB_unique" ON "_UserReadNotices"("A", "B");

-- CreateIndex
CREATE INDEX "_UserReadNotices_B_index" ON "_UserReadNotices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssignedTasks_AB_unique" ON "_AssignedTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignedTasks_B_index" ON "_AssignedTasks"("B");

-- AddForeignKey
ALTER TABLE "Blacklist" ADD CONSTRAINT "Blacklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novels" ADD CONSTRAINT "Novels_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novels" ADD CONSTRAINT "Novels_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novels" ADD CONSTRAINT "Novels_converterId_fkey" FOREIGN KEY ("converterId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novels" ADD CONSTRAINT "Novels_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingChapters" ADD CONSTRAINT "RatingChapters_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingChapters" ADD CONSTRAINT "RatingChapters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPermissions" ADD CONSTRAINT "_UserPermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPermissions" ADD CONSTRAINT "_UserPermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAdapter" ADD CONSTRAINT "_UserAdapter_A_fkey" FOREIGN KEY ("A") REFERENCES "Adapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAdapter" ADD CONSTRAINT "_UserAdapter_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersTouserProps" ADD CONSTRAINT "_UsersTouserProps_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersTouserProps" ADD CONSTRAINT "_UsersTouserProps_B_fkey" FOREIGN KEY ("B") REFERENCES "userProps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteNovels" ADD CONSTRAINT "_FavoriteNovels_A_fkey" FOREIGN KEY ("A") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteNovels" ADD CONSTRAINT "_FavoriteNovels_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_novelsTags" ADD CONSTRAINT "_novelsTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_novelsTags" ADD CONSTRAINT "_novelsTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchasedChapters" ADD CONSTRAINT "_PurchasedChapters_A_fkey" FOREIGN KEY ("A") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchasedChapters" ADD CONSTRAINT "_PurchasedChapters_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedComments" ADD CONSTRAINT "_LikedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedComments" ADD CONSTRAINT "_LikedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotices" ADD CONSTRAINT "_UserNotices_A_fkey" FOREIGN KEY ("A") REFERENCES "Notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotices" ADD CONSTRAINT "_UserNotices_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserReadNotices" ADD CONSTRAINT "_UserReadNotices_A_fkey" FOREIGN KEY ("A") REFERENCES "Notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserReadNotices" ADD CONSTRAINT "_UserReadNotices_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignedTasks" ADD CONSTRAINT "_AssignedTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignedTasks" ADD CONSTRAINT "_AssignedTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
