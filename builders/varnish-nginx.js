'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const LandoNginx = require('./../../node_modules/@lando/nginx/builders/nginx.js');

// Builder
module.exports = {
  name: 'varnish-nginx',
  parent: 'nginx',
  builder: (parent, config) => class VarnishNginx extends LandoNginx(parent, config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    };
  },
};
