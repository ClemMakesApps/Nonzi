'use strict';

var mongoose = require('mongoose-q')(require('mongoose')),
    Schema = mongoose.Schema;

var DonationSchema = new Schema({
  upline: {type: Schema.Types.ObjectId, ref: 'Donation'},
  downline: [{type: Schema.Types.ObjectId, ref: 'Donation'}],
  amount: Number,
  user: String,
  organization: String, //field to specify which organization
  isPaid: Boolean,
  downlineAmount: { type: Number, default: 0},
  downlineCount: {type: Number, default: 0},
  firstTime: { type: Boolean, default: true},
  createdAt: Date
});

module.exports = mongoose.model('Donation', DonationSchema);
