// Prevent checkout if cart is empty
exports.checkCartNotEmpty = (req, res, next) => {
  if (!req.session.cart || req.session.cart.items.length === 0) {
    return res.redirect("/");
  }
  next();
};
