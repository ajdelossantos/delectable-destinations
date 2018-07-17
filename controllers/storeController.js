const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(
    "\n========================================\nRequest made to '/'\n========================================\n"
  );
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

// when using async-await, use middleware, catchErrors, for error handling
// See errorHandlers.js, line 9

// Instead of promises, use async await
exports.createStore = async (req, res) => {
  const store = new Store(req.body);

  // use await keyword when function returns a promise
  await store.save();

  console.log('Saved new store!');
  res.redirect('/');
};
