// Allow only admin
exports.adminOnly = (req, res, next) => {
  if (req.session.user?.email !== "admin@shop.com") {
    return res.status(403).send("Access Denied");
  }
  next();
};
