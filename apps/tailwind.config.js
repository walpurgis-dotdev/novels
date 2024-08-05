/** @type {import('tailwindcss').Config} */

export const darkMode = "class";
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./themes/**/*.{js,ts,jsx,tsx,mdx}",
  "./utils/**/*.{js,ts,jsx,tsx,mdx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      jump: {
        "0%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-3px)" },
        to: { transform: "translateY(0)" },
      },
      jumpR: {
        "0%": { transform: "translateX(0)" },
        "50%": { transform: "translateX(3px)" },
        to: { transform: "translateX(0)" },
      },
      jumpL: {
        "0%": { transform: "translateX(0)" },
        "50%": { transform: "translateX(-3px)" },
        to: { transform: "translateX(0)" },
      },
      scroll: {
        to: {
          transform: "translate(calc(-50% - 0.5rem))",
        },
      },
      marquee: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      jump: "jump 0.3s",
      jumpR: "jumpR 0.3s",
      jumpL: "jumpL 0.3s",
      marquee: "marquee 10s linear infinite",
      scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};
export const plugins = [require("tailwindcss-animate"), require("@tailwindcss/typography")];
