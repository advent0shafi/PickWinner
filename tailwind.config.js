/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-2':"url('/bg-red.png')",
        'bg-1':"url('/bg-1.jpg')",
        'bg-3':"url('/bg-3.png')",
        'bg-4':"url('/image.png')",
        'bg-5':"url('/logoImage.png')",
        'bg-6':"url('/bg-6.jpg')",

      },
      fontFamily: {
        'Sora':['Sora','sans-serif;'],
        'Syn':['Syne','sans-serif']
      },
    },
  },
  plugins: [],
}
