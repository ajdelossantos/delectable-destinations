// Middleware - runs code after req, but before res

exports.homePage = (req, res) => {
  console.log(
    "\n========================================\nRequest made to '/'\n========================================\n"
  );
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = (req, res) => {
  console.log(req.body);
  res.json(req.body);
};
