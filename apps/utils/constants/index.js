import { fontMono, fontRoboto, fontSans } from "@/styles/fonts";

export const BACKEND_BASE_URL = "http://localhost:3000";
export const FRONTEND_BASE_URL = "http://localhost:3001";
export const REPOSITORY_OWNER = "lilwxs";
export const REPOSITORY_NAME = "__graduationThesis_VibeVerse";
export const REPOSITORY_URL = `https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`;
export const DISCORD_URL = "";

export const accessTokenExpiresIn = 60 * 60 * 24 * 3; // 3 days
export const refreshTokenExpiresIn = 60 * 60 * 24 * 7; // 7 days

export const settings = {
	themeToggleEnabled: true,
};

// Pagination settings
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];
export const MAX_DISPLAY_PAGES = 5;
export const ELLIPSIS_OFFSET = 2;

// Href paths for routing
export const HREF_NOVELS_DETAILS = (slug) => `/novel/${slug}`;
export const HREF_NOVELS_CHAPTERS = (slug, id) =>
	`/novel/${slug}/chuong-1-${id}`;

// Image types for ranking lists
export const IMAGE_TYPE = {
	popular: "popular",
	view_day: "view_day",
	view_week: "view_week",
	view_month: "view_month",
	review: "review",
	recommend: "recommend",
	favorite: "favorite",
	created_at: "created_at",
	new_chap_at: "new_chap_at",
	comment: "comment",
	chapter_count: "chapter_count",
};

export const IMAGE_NOVEL_DEFAULT = "/assets/images/600.webp";
export const IMAGE_AVATAR_DEFAULT = "/assets/images/600.webp";

// Image rankings for ranking lists
export const IMAGE_RANKINGS = {
	first: "/assets/tops/num/num_1.svg",
	second: "/assets/tops/num/num_2.svg",
	third: "/assets/tops/num/num_3.svg",
};

export const controls = {
	settingsEnabled: true,
	bookDetailsEnabled: true,
	commentsEnabled: true,
};

export const optionalControls = {
	themeColorSchema: [
		{
			backgroundColor: "bg-background",
			accentColor: "bg-[#fff] dark:bg-[#111111]",
			fontColor: "text-muted-foreground",
			label: "Light",
		},
	],
	maxWidthSchema: [
		{ maxWidth: "max-w-[680px]", label: "680" },
		{ maxWidth: "max-w-[800px]", label: "800" },
		{ maxWidth: "max-w-[1000px]", label: "1000" },
		{ maxWidth: "max-w-[1200px]", label: "1200" },
	],
	fontFamilySchema: [
		{ fontFamily: fontRoboto.className, label: "Default" },
		{ fontFamily: fontSans.className, label: "Sans" },
		{ fontFamily: fontMono.className, label: "Mono" },
	],
	fontSizeSchema: [
		{ fontSize: "text-xs", label: "12" },
		{ fontSize: "text-sm", label: "14" },
		{ fontSize: "text-base", label: "16" },
		{ fontSize: "text-lg", label: "18" },
		{ fontSize: "text-xl", label: "20" },
		{ fontSize: "text-2xl", label: "22" },
		{ fontSize: "text-3xl", label: "24" },
	],
	lineHeightSchema: [
		{ lineHeight: "leading-none", label: `${Math.round((1 / 1.5) * 100)}%` }, // 67%
		{
			lineHeight: "leading-tight",
			label: `${Math.round((1.25 / 1.5) * 100)}%`,
		}, // 83%
		{
			lineHeight: "leading-snug",
			label: `${Math.round((1.375 / 1.5) * 100)}%`,
		}, // 92%
		{ lineHeight: "leading-normal", label: "100%" }, // 100%
		{
			lineHeight: "leading-relaxed",
			label: `${Math.round((1.625 / 1.5) * 100)}%`,
		}, // 108%
		{ lineHeight: "leading-loose", label: `${Math.round((2 / 1.5) * 100)}%` }, // 133%
	],
};
