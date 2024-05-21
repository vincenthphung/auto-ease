/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5',
          DEFAULT: '#4338ca',
          dark: '#3730a3',
        },
        secondary: {
          light: '#22d3ee',
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
        },
        accent: {
          light: '#f3a712',
          DEFAULT: '#e89c00',
          dark: '#c87d00',
        },
        neutral: {
          light: '#f5f5f5',
          DEFAULT: '#e5e5e5',
          dark: '#d4d4d4',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        36: '9rem',
        42: '10.5rem',
        48: '12rem',
        54: '13.5rem',
        60: '15rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Menlo', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            h1: {
              color: theme('colors.primary.dark'),
            },
            h2: {
              color: theme('colors.primary.DEFAULT'),
            },
            h3: {
              color: theme('colors.primary.light'),
            },
            code: {
              color: theme('colors.accent.dark'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
   variants: {
    extend: {
      borderColor: ['hover', 'focus', 'active'],
      backgroundColor: ['hover', 'focus', 'active'],
    },
  },
}
