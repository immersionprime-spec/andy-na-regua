import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
      },
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-surface-hover": "var(--bg-surface-hover)",
        "text-primary": "var(--text-primary)",
        "text-warm": "var(--text-warm)",
        "text-muted-1": "var(--text-muted-1)",
        "text-muted-2": "var(--text-muted-2)",
        "text-muted-3": "var(--text-muted-3)",
        "text-muted-4": "var(--text-muted-4)",
        "action-primary": "var(--action-primary)",
        "action-primary-hover": "var(--action-primary-hover)",
        "action-selection": "var(--action-selection)",
        "action-selection-light": "var(--action-selection-light)",
        "accent-gold": "var(--accent-gold)",
        "accent-gold-soft": "var(--accent-gold-soft)",
        "state-success": "var(--state-success)",
        "state-success-deep": "var(--state-success-deep)",
        "state-error": "var(--state-error)",
        "state-warning": "var(--state-warning)",
        "light-block-bg": "var(--light-block-bg)",
        "light-block-text": "var(--light-block-text)",
      },
    },
  },
};

export default config;
