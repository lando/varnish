'use strict';

const _ = require('lodash');
const landoNginx = require('./../node_modules/@lando/nginx/builders/nginx.js');

// Builder
module.exports = {
  name: 'varnish-nginx',
  parent: '_service',
  builder: parent => class VarnishNginx extends landoNginx.builder(parent, landoNginx.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};
