/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Donation = require('./donation.model');

exports.register = function(socket) {
  Donation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Donation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('donation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('donation:remove', doc);
}