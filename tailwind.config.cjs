/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: 'var(--brand-burgundy)',
          'burgundy-dark': 'var(--brand-burgundy-dark)',
          'burgundy-light': 'var(--brand-burgundy-light)',
          'burgundy-accent': 'var(--brand-burgundy-accent)',
          gold: 'var(--brand-gold)',
          cream: 'var(--brand-cream)',
          'cream-light': 'var(--brand-cream-light)',
          'cream-ultralight': 'var(--brand-cream-ultralight)',
          ink: 'var(--brand-ink)',
          'text-muted': 'var(--brand-text-muted)',
          'text-secondary': 'var(--brand-text-secondary)',
          'text-subtle': 'var(--brand-text-subtle)',
          'text-light': 'var(--brand-text-light)',
          'text-caption': 'var(--brand-text-caption)',
          'text-warm': 'var(--brand-text-warm)',
          'border-light': 'var(--brand-border-light)',
          'border-input': 'var(--brand-border-input)',
          'border-divider': 'var(--brand-border-divider)',
          'border-soft': 'var(--brand-border-soft)',
          'border-gold': 'var(--brand-border-gold)',
          whatsapp: 'var(--brand-whatsapp)',
          'whatsapp-dark': 'var(--brand-whatsapp-dark)',
          'whatsapp-hover': 'var(--brand-whatsapp-hover)',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
        'serif-luxury': ['var(--font-cormorant)', 'Georgia', 'serif'],
        'sans-luxury': ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
