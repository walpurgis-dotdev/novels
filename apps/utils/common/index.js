import { Icons } from "@/components/icons";
import { REPOSITORY_OWNER } from "@/utils/constants";

export const siteConfig = {
	name: "Novels",
	shortName: "Novels",
	author: "lilwxs",
	description: "Novels",
	keywords: "",
	url: {
		// base: env.NEXT_PUBLIC_APP_URL,
		author: REPOSITORY_OWNER,
	},
	// ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.png`,
	mainNav: [
		{
			label: "Bảng xếp hạng",
			href: "about",
			items: [
				{
					label: "Wxs",
					href: "wxs",
					description: "Wxs is the best",
				},
				{
					label: "Wxs",
					href: "wxs",
					description: "Wxs is the best",
				},
				{
					label: "Wxs",
					href: "wxs",
					description: "Wxs is the best",
				},
			],
		},
		{
			label: "Tải ứng dụng",
			href: "download",
			items: [
				{
					label: "Coming soon",
					href: "#",
					description: "Coming soon",
				},
			],
		},
		{
			label: "gì",
			href: "",
			external: true,
			items: [],
		},
	],
	extendNav: [
		{
			label: "Thông điệp",
			href: "/message",
			icon: <Icons.bell size={16} />,
			items: [
				{
					label: "test",
					href: "test",
					description: "test",
				},
				{
					label: "test",
					href: "test",
					description: "test",
				},
				{
					label: "test",
					href: "test",
					description: "test",
				},
			],
		},
		{
			label: "Lịch sử",
			href: "/history",
			icon: <Icons.clock size={16} />,
			items: [],
		},
		{
			label: "Kệ sách",
			href: "/bookshelf",
			icon: <Icons.bookMarked size={16} />,
			items: [],
		},
	],
	categories: [
		{
			id: 1,
			label: "Tất cả tác phẩm",
			href: "/all",
		},
		{
			id: 2,
			label: "Bảng xếp hạng",
			href: "/rankings/all",
		},
		{
			id: 3,
			label: "Tác phẩm mới trong tuần",
			href: "/books/week",
		},
		{
			id: 4,
			label: "Miễn phí",
			href: "/books/free",
		},
		{
			id: 5,
			label: "Upgrade thành viên",
			href: "/books/member",
		},
		{
			id: 6,
			label: "Tác phẩm hot",
			href: "/books/hot",
		},
	],
	menu: [
		{
			label: "Phổ biến",
			href: "rank?tab=default",
			icon: <Icons.crown size={15} />,
		},
		{
			label: "Hot",
			href: "rank?tab=best_selling_24h",
			icon: <Icons.flame size={15} />,
		},
	],
};

export const rankTabs = {
	novelTabs: [
		{
			id: 1,
			value: "popular",
			label: "Phổ biến",
			sortBy: "viewAll",
		},

		{
			id: 2,
			value: "view_day",
			label: "Lượt xem cao trong ngày",
			sortBy: "viewDay",
			isEnabled: true,
		},
		{
			id: 3,
			value: "view_week",
			label: "Luọt xem cao trong tuần",
			sortBy: "viewWeek",
			isEnabled: true,
		},
		{
			id: 4,
			value: "view_month",
			label: "Lượt xem cao trong tháng",
			sortBy: "viewMonth",
			isEnabled: true,
		},
		{
			id: 5,
			value: "review",
			label: "Danh sách đánh giá cao",
			sortBy: "reviewCount",
			isEnabled: true,
		},
		{
			id: 6,
			value: "recommend",
			label: "Người dùng đề xuất",
			sortBy: "flowerCount",
			isEnabled: true,
		},
		{
			id: 7,
			value: "favorite",
			label: "Yêu thích nhiều nhất",
			sortBy: "favoriteCount",
			isEnabled: true,
		},
		{
			id: 8,
			value: "created_at",
			label: "Tác phẩm mới nhất",
			sortBy: "createdAt",
			isEnabled: true,
		},
		{
			id: 9,
			value: "new_chap_at",
			label: "Truyện mới cập nhật",
			sortBy: "newChapAt",
			isEnabled: true,
		},
		{
			id: 10,
			value: "comment",
			label: "Nhiều người thảo luận",
			sortBy: "commentCount",
			isEnabled: true,
		},
		{
			id: 11,
			value: "chapter_count",
			label: "Nhiều chương nhất",
			sortBy: "chapterCount",
			isEnabled: true,
		},
	],
	converterTabs: [
		{
			id: 1,
			value: "famous_converter",
			label: "Danh sách nổi tiếng của tác giả",
			isEnabled: true,
		},
	],
};

export const creatorItems = [
	{
    title: "Đã đăng",
    href: "/novels",
    icon: "libraryBig",
    label: "Published",
  },
  {
    title: "Thêm mới",
    href: "/novels/create",
    icon: "filePlus",
    label: "Create",
  },
  {
    title: "Chờ lấp hố",
    href: "/novels/sos",
    icon: "handHelping",
    label: "SOS",
  },
  {
    title: "Dịch nhanh",
    href: "https://dichnhanh.com/",
    icon: "languages",
    label: "Translate",
    isExternal: true,
  },
	{
		title: "Cộng đồng",
		icon: "earth",
		color: "text-green-500",
		items: [
			{
				title: "Discord",
				href: "discord.gg",
				icon: "link",
				color: "text-blue-500",
				isExternal: true,
			},
			{
				title: "Instagram",
				href: "instagram.com",
				icon: "link",
				color: "text-pink-500",
        isExternal: true,
			},
			{
				title: "Github",
				href: "github.com",
				icon: "link",
        color: "text-gray-500",
        isExternal: true,
			},
		],
	},
];

export const festivals = [
	{
		id: 1,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/1",
	},
	{
		id: 2,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/23456345",
	},
	{
		id: 3,
		name: "Huyền Huyễn",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/345747",
	},
	{
		id: 4,
		name: "Nhất Quỷ Nhì Ma",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/6358364834",
	},
	{
		id: 5,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/543572537",
	},
	{
		id: 6,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/6568548",
	},
	{
		id: 7,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/73257457",
	},
	{
		id: 8,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/2352358",
	},
	{
		id: 9,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/9123521",
	},
	{
		id: 10,
		name: "Tonic",
		image:
			"/assets/images/32a92ff7e101abb3260aa4941ece6ae55cbc8c26.jpg@976w_550h_1c_!web-home-carousel-cover.avif",
		href: "/festival/0124124",
	},
];

export const honors = [
	{
		value: "Danh hiệu 1",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/jingpinpindao_v3.png",
	},
	{
		value: "Danh hiệu 2",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/rongyao_2_v3.png",
	},
	{
		value: "Danh hiệu 3",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/jingpinpindao_v3.png",
	},
	{
		value: "Danh hiệu 4",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/rongyao_2_v3.png",
	},
	{
		value: "Danh hiệu 5",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/jingpinpindao_v3.png",
	},
	{
		value: "Danh hiệu 6",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/rongyao_2_v3.png",
	},
	{
		value: "Danh hiệu 7",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/jingpinpindao_v3.png",
	},
	{
		value: "Danh hiệu 8",
		src: "https://qdfepccdn.qidian.com/www.qidian.com/images/book/badges/rongyao_2_v3.png",
	},
];

export const adsFestival = [
	{
		id: 1,
		href: "/",
		image:
			"https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/fa44d7ba7d84c6afe5ebf873108bb3a1.jpg",
	},
	{
		id: 2,
		href: "/",
		image:
			"https://plus.unsplash.com/premium_photo-1674939148088-d71acc1541ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 3,
		href: "/",
		image:
			"https://img2.qidian.com/upload/gamesy/2022/07/13/20220713154239noi3wqet18.png",
	},
];

export const admItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/dashboard/user",
    icon: "user",
    label: "Users",
  },
];
