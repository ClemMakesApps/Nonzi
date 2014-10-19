'use strict';
var q = require('Q');

var mongoose = require('mongoose-q')(require('mongoose')),
    Schema = mongoose.Schema;

var DonationSchema = new Schema({
  upline: {type: Schema.Types.ObjectId, ref: 'Donation'},
  downline: [{type: Schema.Types.ObjectId, ref: 'Donation'}],
  amount: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  isPaid: Boolean,
  downlineAmount: { type: Number, default: 0},
  downlineCount: Number,
  firstTime: { type: Boolean, default: true}
});

module.exports = mongoose.model('Donation', DonationSchema);
