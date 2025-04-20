require("http-proxy-middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    console.log(req.url);
    if (req.url.endsWith(".br")) {
      res.setHeader("Content-Encoding", "br");
      res.setHeader("Content-Type", "application/javascript");
    }
    next();
  });
};
