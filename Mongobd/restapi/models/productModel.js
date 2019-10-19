var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  // product_name: { type: String, Required:  'Product name cannot be left blank.' },
  //
  // price:    { type: String,     Required:  'Product price cannot be left blank.'},
  //
  // category: { type: String ,    Required:  'Product category cannot be left blank'}
  // asin: {type: String},
  // brand: {type: String},
  // categories: {type: Array},
  // description: {type: String},
  // imUrl: {type: String},
  // price: {type: String},
  // related: {type: Object},
  // salesRank: {type: Object},
  // title: {type: String}
});


module.exports = mongoose.model('products', productSchema);
