import { tv } from "tailwind-variants";

export const typographyVariants = tv(
	{
		base: "prose text-foreground",
		variants: {
			size: {
				small: "prose-sm",
				base: "prose-base",
				large: "prose-lg",
				larger: "prose-xl",
				largest: "prose-2xl",
			},
			color: {
				gray: "prose-gray",
				slate: "prose-slate",
				zinc: "prose-zinc",
				neutral: "prose-neutral",
				stone: "prose-stone",
			},
		},
	},
	{
		responsiveVariants: ["xs", "sm", "md", "lg", "xl"],
	},
);
