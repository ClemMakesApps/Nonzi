'use strict';

var _ = require('lodash');
var Donation = require('./donation.model');


var updateParent = function(child){
  var promise = Donation.findOne({'_id': child.upline}).execQ(function(err, parent){
    parent.downline.push(child._id);
    if(parent.downline.size === 3){
      //schedule payment
    }
    parent.save(function(err){
      console.log('***ERR', err);
    });
  });
 return promise;
}


var updateDownlineAmount = function(doc, num){
  console.log('***DOC', doc);
  if(doc == null || doc.upline == null){
    return;
  }
  var promise = Donation.findOne({'_id': doc.upline}, function(err, parent){
    parent.downlineAmount += num;
    console.log('***RECURSE', parent.downlineAmount);
    parent.save(function(err){
     console.log(err);
    });
    return updateDownlineAmount(parent, parent.downlineAmount);
  });
  return promise;
}


  var afterSave = function(doc){
    var downlineAmount;
    console.log('***UPLINE', doc.upline, doc.upline != null);
    doc.downlineAmount = doc.amount;
    doc.save(function(err){
      console.log(err);
    });
    if(doc.upline != null){
      updateParent(doc);
      updateDownlineAmount(doc, doc.amount);
    }
  };


// Get list of donations
exports.index = function(req, res) {
  Donation.find(function (err, donations) {
    if(err) { return handleError(res, err); }
    return res.json(200, donations);
  });
};

// Get a single donation
exports.show = function(req, res) {
  Donation.findById(req.params.id, function (err, donation) {
    if(err) { return handleError(res, err); }
    if(!donation) { return res.send(404); }
    return res.json(donation);
  });
};

// Creates a new donation in the DB.
exports.create = function(req, res) {
  Donation.create(req.body, function(err, donation) {
    afterSave(donation);
    if(err) { return handleError(res, err); }
    return res.json(201, donation);
  });
};

// Updates an existing donation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Donation.findById(req.params.id, function (err, donation) {
    if (err) { return handleError(res, err); }
    if(!donation) { return res.send(404); }
    var updated = _.merge(donation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, donation);
    });
  });
};

// Deletes a donation from the DB.
exports.destroy = function(req, res) {
  Donation.findById(req.params.id, function (err, donation) {
    if(err) { return handleError(res, err); }
    if(!donation) { return res.send(404); }
    donation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
