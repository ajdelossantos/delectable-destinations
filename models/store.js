const mongoose = require('mongoose');

// Tells mongoose to use the global Promise library
mongoose.Promise = global.Promise;

// URL-friendly names for slugs
const slug = require('slugs');

// Pass it an object and specify types/object properties
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please entor a store name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        required: 'You must supply coordinates!'
      }
    ],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  photo: String
});

// need to pass storeSchema scope, so no arrow functions
storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Store', storeSchema);
