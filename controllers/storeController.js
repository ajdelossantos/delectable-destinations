const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" });
    }
  }
};

// Middleware
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there's no new file to resize
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;

  // Resize logic
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);

  next();
};

exports.homePage = (req, res) => {
  console.log(
    "\n========================================\nRequest made to '/'\n========================================\n"
  );
  res.render('index');
};

// Begin controller functions

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

// when using async-await, use middleware, catchErrors, for error handling
// See errorHandlers.js, line 9
// Instead of promises, use async await
exports.createStore = async (req, res) => {
  // use await keyword when function returns a promise
  const store = await new Store(req.body).save();

  console.log('Saved new store!');
  req.flash(
    'success',
    `Successfully created ${store.name}. Care to leave a review?`
  );
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // Get all stores, then render them
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
  // 1. Find store with ID
  const store = await Store.findOne({ _id: req.params.id });
  // 2. Confirm user is owner
  // TODO when AUTH done
  // 3. Render out edit form
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // Set location data to be a point
  req.body.location.type = 'Point';

  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true
  }).exec();

  req.flash(
    'success',
    `Successfully updated <stromg>${store.name}</strong>. <a href="/stores/${
      store.slug
    }">View Store!</a>`
  );

  res.redirect(`/stores/${store._id}/edit`);
};
