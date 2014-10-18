'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DonationSchema = new Schema({
  upline: {type: Schema.Types.ObjectId, ref: 'User'},
  downline: [{type: Schema.Types.ObjectId, ref: 'User'}],
  amount: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  isPaid: Boolean,
  downlineAmount: Number,
  downlineCount: Number
});

module.exports = mongoose.model('Donation', DonationSchema);
