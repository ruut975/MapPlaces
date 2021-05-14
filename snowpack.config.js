module.exports = {
  plugins: [
    "@snowpack/plugin-sass"
  ],
  "routes": [
    {"match": "routes", "src": ".*", "dest": "/public/index.html"}
]
};