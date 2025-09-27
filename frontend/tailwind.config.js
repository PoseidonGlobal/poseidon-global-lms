const withOpacity = (v) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(${v}) / 1)`
    : `rgb(var(${v}) / ${opacityValue})`;

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (resolved via CSS vars)
        bg: {
          DEFAULT: withOpacity('--color-bg'),
          alt: withOpacity('--color-bg-alt'),
          subtle: withOpacity('--color-bg-subtle'),
          panel: withOpacity('--color-bg-panel'),
        },
        brand: {
          primary: withOpacity('--color-brand-primary'),
          accent: withOpacity('--color-brand-accent'),
        },
        text: {
          DEFAULT: withOpacity('--color-text'),
          muted: withOpacity('--color-text-muted'),
          faint: withOpacity('--color-text-faint'),
          invert: withOpacity('--color-text-invert'),
        },
        border: {
          DEFAULT: withOpacity('--color-border'),
          strong: withOpacity('--color-border-strong'),
          glow: withOpacity('--color-border-glow'),
        },
        status: {
          error: withOpacity('--color-status-error'),
          warn: withOpacity('--color-status-warn'),
          success: withOpacity('--color-status-success'),
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        poseidon: "url('/images/poseidon-bg.jpg')",
        'radial-glow': 'radial-gradient(circle at 35% 20%, rgba(14,112,140,0.35), transparent 60%)',
      },
      boxShadow: {
        'brand-sm': '0 0 0 1px rgb(var(--color-brand-primary) / 0.5)',
        'brand-glow': '0 0 0 1px rgb(var(--color-brand-primary) / 0.6), 0 4px 18px -2px rgb(var(--color-brand-primary) / 0.35)',
        panel: '0 4px 30px -4px rgba(0,0,0,0.45)',
      },
      borderRadius: {
        brand: '14px',
      },
      animation: {
        'slow-pulse': 'slowPulse 6s ease-in-out infinite',
      },
      keyframes: {
        slowPulse: {
          '0%,100%': { opacity: 0.55 },
          '50%': { opacity: 0.9 },
        },
      },
    },
  },
  plugins: [],
};
