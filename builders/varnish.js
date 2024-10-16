'use strict';

// Modules
const path = require('path');
const _ = require('lodash');

// Builder
module.exports = {
  name: 'varnish',
  config: {
    version: '6.0',
    supported: ['6', '6.0', '4', '4.1'],
    legacy: ['4', '4.1'],
    pinPairs: {
      '6': 'wodby/varnish:6.0-4.21.6',
      '6.0': 'wodby/varnish:6.0-4.21.6',
      '4': 'wodby/varnish:4.1-4.14.2',
      '4.1': 'wodby/varnish:4.1-4.14.2',
    },
    patchesSupported: true,
    backend: undefined,
    backends: ['appserver'],
    backend_port: '80',
    confSrc: path.resolve(__dirname, '..', 'config'),
    ssl: false,
    sslExpose: false,
    sources: [],
    defaultFiles: {
      ssl: 'ssl-termination.conf.tpl',
    },
    remoteFiles: {
      vcl: '/etc/varnish/lando.vcl',
    },
  },
  parent: '_lando',
  builder: (parent, config) => class LandoVarnish extends parent {
    constructor(id, options = {}, factory) {
      options = _.merge({}, config, options);

      // Arrayify the backends
      if (!_.isArray(options.backends)) options.backends = [options.backends];
      // if we have no backend then use the first entry in backends
      if (!options.backend && options.backends.length > 0) options.backend = options.backends[0];

      // get the orchestrator separator
      const separator = options?._app?._lando?.config?.orchestratorSeparator ?? '_';

      // Build the default stuff here
      const varnish = {
        image: `wodby/varnish:${options.version}`,
        command: '/docker-entrypoint.sh /etc/init.d/varnishd',
        depends_on: [options.backend],
        environment: {
          VARNISH_BACKEND_HOST: [options._app.project, options.backend, '1'].join(separator),
          VARNISH_BACKEND_PORT: options.backend_port,
          LANDO_NO_USER_PERMS: 'NOTGONNADOIT',
          LANDO_WEBROOT_USER: 'varnish',
          LANDO_WEBROOT_GROUP: 'varnish',
          LANDO_WEBROOT_UID: '100',
          LANDO_WEBROOT_GID: '101',
        },
        ports: ['80'],
        volumes: [
          `${options.data}:/var/lib/varnish`,
          `${options.confDest}/lando.default.vcl.tmpl:/etc/gotpl/default.vcl.tmpl`,
          `${options.confDest}/lando.varnishd.init.d.tmpl:/etc/gotpl/varnishd.init.d.tmpl`,
        ],
      };
      // Set LANDO_CUSTOM_VCL
      if (_.has(options, 'config.vcl')) varnish.environment.LANDO_CUSTOM_VCL = 'YOUBETCHA!';
      // Change the me user
      options.meUser = 'varnish';
      // Set some info about our backends
      options.info = {backend: `${options.backend}:${options.backend_port}`};
      // Set the varnish
      options.sources.push({services: _.set({}, options.name, varnish)});

      // Spin up an nginx bomb if we need ssl termination
      if (options.ssl) {
        // Set the opts for this custom swill
        const sslOpts = _.assign(_.cloneDeep(options), {
          name: `${options.name}_ssl`,
          type: 'lando',
          api: '3',
          version: 'custom',
          services: {
            image: 'nginx:1.27.3',
            command: '/docker-entrypoint.sh nginx -g "daemon off;"',
            depends_on: [options.name],
            environment: {
              LANDO_VARNISH_ALIAS: `${options.name}_varnish`,
              LANDO_VARNISH_UPSTREAM: [options._app.project, options.name, '1'].join(separator),
            },
            ports: ['443'],
            volumes: [
              `${options.confDest}/${options.defaultFiles.ssl}:/etc/nginx/templates/default.conf.template`,
            ],
          },
          info: {
            backend: options.name,
            managed: true,
          },
          meUser: 'www-data',
          overrides: require('../utils/clone-overrides')(options.overrides),
          ssl: true,
          sslExpose: true,
        });

        // Set another lando service we can pass down the stream
        const Lando3Service = factory.get('lando', 3);
        const data = new Lando3Service(sslOpts.name, sslOpts);

        // This is a trick to basically replicate what happens upstream
        options._app.add(data);
        options._app.info.push(data.info);

        // Indicate the relationship on the primary service
        options.info.ssl_served_by = sslOpts.name;
      }

      // Send it downstream
      super(id, options, ..._.flatten(options.sources));
    }
  },
};
