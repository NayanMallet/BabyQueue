import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

export default {
    content: [
        "./index.html",
        "./resources/**/*.{vue,js,ts,jsx,tsx,blade.php}",
        "./inertia/**/*.{vue,js,ts}",
        "./components/**/*.{vue,js,ts}",
    ],
    theme: {
        container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
                primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
                secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
                destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",

                // Jeu complet pour la sidebar (shadcn)
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },

                // Palette sand (tes variables CSS)
                sand: {
                    1: "var(--sand-1)", 2: "var(--sand-2)", 3: "var(--sand-3)", 4: "var(--sand-4)",
                    5: "var(--sand-5)", 6: "var(--sand-6)", 7: "var(--sand-7)", 8: "var(--sand-8)",
                    9: "var(--sand-9)", 10: "var(--sand-10)", 11: "var(--sand-11)", 12: "var(--sand-12)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": { from: { height: "0" }, to: { height: "var(--reka-accordion-content-height)" } },
                "accordion-up": { from: { height: "var(--reka-accordion-content-height)" }, to: { height: "0" } },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [animate],
} satisfies Config
