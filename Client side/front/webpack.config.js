const path = require('path');

module.exports = {
  devServer: {
    allowedHosts: ['localhost'],
    port: 3001,  // Ensuring it runs on port 3001 as per your start script
    proxy: {
      '/api': 'http://localhost:8009'
    },
  },
  // Other configurations go here if needed
};
