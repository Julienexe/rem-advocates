const middleware = require('./middleware');

const config = {
  port: 3000,
  host: '0.0.0.0',  // Allow external connections
  open: false,      // Prevent automatic browser opening
  files: ["./dist/**/*.*"],
  server: { 
    baseDir: "./dist",
    routes: {
      "/": "dist",
      "/assets": "dist/assets",
      "/static": "dist/static",
      "/downloads": "dist/downloads"
    },
    middleware: {
      0: function(req, res, next) {
        if (req.url.endsWith('.pdf')) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=' + req.url.split('/').pop());
        }
        next();
      }
    }
  },
  watch: true,
  ghostMode: false,  // Disable synchronization between browsers
  notify: false,
  logLevel: "debug",
  watchOptions: {
    ignored: ['node_modules'],
    ignoreInitial: false
  }
};

module.exports = config;