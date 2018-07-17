// Middleware - runs code after req, but before res

exports.homePage = (req, res) => {
  console.log(
    "\n========================================\nRequest made to '/'\n========================================\n"
  );
  res.render("index");
};
