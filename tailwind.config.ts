import type { Config } from "tailwindcss";

/*
 * Tailwind configuration for this project.
 *
 * Color tokens map to CSS variables defined in globals.css.
 * Token philosophy and Figma-to-code mapping is documented in design-tokens.md.
 *
 * When adding a new color, the order is:
 *   1. Add the CSS variable to globals.css (both :root and .dark)
 *   2. Add the mapping here so the utility class becomes available
 *   3. Update design-tokens.md with the new Figma → code mapping
 *
 * Added tokens (project-specific extensions beyond shadcn defaults) are
 * marked with comments matching globals.css.
 */

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        /* ─── Default ─────────────────────────────────────────────── */
        background: "var(--background)",
        foreground: "var(--foreground)",

        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
          /* Added */
          secondary: "var(--muted-secondary)",
          "foreground-secondary": "var(--muted-foreground-secondary)",
        },

        /* Added */
        inverted: {
          DEFAULT: "var(--inverted)",
          foreground: "var(--inverted-foreground)",
        },

        /* ─── Card ────────────────────────────────────────────────── */
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
          /* Added */
          muted: "var(--card-muted)",
        },

        /* ─── Component: popover ──────────────────────────────────── */
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },

        /* ─── Component: primary button ───────────────────────────── */
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },

        /* ─── Component: secondary button ─────────────────────────── */
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        /* ─── Component: destructive button ───────────────────────── */
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },

        /* ─── Component: accent (hover/focus on neutral items) ────── */
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        /* ─── Status (Added) ──────────────────────────────────────── */
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        error: {
          DEFAULT: "var(--error)",
          foreground: "var(--error-foreground)",
        },

        /* ─── Brand (Added) ───────────────────────────────────────── */
        "brand-primary": {
          DEFAULT: "var(--brand-primary)",
          foreground: "var(--brand-primary-foreground)",
        },
        "brand-secondary": {
          DEFAULT: "var(--brand-secondary)",
          foreground: "var(--brand-secondary-foreground)",
        },

        /* ─── Border, input, ring ─────────────────────────────────── */
        border: {
          DEFAULT: "var(--border)",
          /* Added */
          secondary: "var(--border-secondary)",
        },
        input: "var(--input)",
        ring: "var(--ring)",
        "ring-offset": "var(--ring-offset)",

        /* ─── Sidebar ─────────────────────────────────────────────── */
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },

        /* ─── Charts ──────────────────────────────────────────────── */
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
