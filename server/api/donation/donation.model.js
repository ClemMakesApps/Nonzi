'use strict';
var q = require('Q');

var mongoose = require('mongoose-q')(require('mongoose')),
    Schema = mongoose.Schema;

var DonationSchema = new Schema({
  upline: {type: Schema.Types.ObjectId, ref: 'Donation'},
  downline: [{type: Schema.Types.ObjectId, ref: 'Donation'}],
  amount: Number,
  user: String,
  isPaid: Boolean,
  downlineAmount: { type: Number, default: 0},
  downlineCount: {type: Number, default: 0},
  firstTime: { type: Boolean, default: true},
  createdAt: Date
});

DonationSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
});

module.exports = mongoose.model('Donation', DonationSchema);
