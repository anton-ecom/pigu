import type { Config } from "tailwindcss";

export default {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1420px",
      "2xl": "1660px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        primary: ["Lato", "sans-serif"],
        secondary: ["Ubuntu", "sans-serif"],
      },

      fontWeight: {
        thin: "100", // Add this for thin weight
      },

      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      screens: {
        "hover-hover": {
          raw: "(hover: hover) and (pointer: fine)",
        },
      },
      animation: {
        "loading-bar": "growBar 2s ease-out",
        blink: "blink 1s steps(2, start) infinite",
      },
      keyframes: {
        growBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        gradientSlide: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%": { opacity: "0.2" },
          "25%": { opacity: "1" },
          "50%": { opacity: "1" },
          "75%": { opacity: "0.2" },
          "100%": { opacity: "0" },
        },
        glow: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
      },
    },
    variables: {
      DEFAULT: {
        sizes: {
          small: "1rem",
        },
        colors: {
          red: {
            "50": "red",
          },
        },
      },
    },
    darkVariables: {
      DEFAULT: {
        colors: {
          red: {
            "50": "blue",
          },
        },
      },
    },
  },
  layer: {
    scrollbar: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
