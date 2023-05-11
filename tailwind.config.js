/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "240px auto", // for sidenavbar layout; adds grid-cols-sidebar class
      }, 
      gridTemplateRows: {
        header: "64px auto", // for topnavbar layout; adds grid-rows-header class
      },
    },
  },
}
