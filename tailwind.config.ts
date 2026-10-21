import type { Config } from 'tailwindcss'

import animate from "tailwindcss-animate"

const config: Config = {
   darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
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
        background: "#050816",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
          dark: "#2A64C2",
        },
        secondary: {
          DEFAULT: "#7C3AED",
          foreground: "#FFFFFF",
        },
        surface: "#0B1026",
        accent: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#94A3B8",
          foreground: "#64748B",
        },
        popover: {
          DEFAULT: "#0B1026",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#0B1026",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [animate],
}

export default config