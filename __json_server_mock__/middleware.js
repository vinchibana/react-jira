/*module.exports = (req, res, next) => {
  res.header('X-Hello', 'World')
  next()
}*/

module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400);
    }
  }
  next();
};
