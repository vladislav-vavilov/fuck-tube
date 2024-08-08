import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      animation: {
        line: 'line 1.5s ease-out infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
export default config
