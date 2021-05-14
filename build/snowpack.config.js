module.exports = {
  plugins: [
    "@snowpack/plugin-sass"
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: './public/index.html' },
  ],
};