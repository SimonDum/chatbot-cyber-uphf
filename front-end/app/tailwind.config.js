export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  preflight: false, // Désactive le reset CSS en v4
}


module.exports = {
  // ... autres options
  corePlugins: {
    preflight: false, // Désactive le reset CSS
  },
}