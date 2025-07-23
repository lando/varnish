# Varnish Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [Varnish](https://varnish-cache.org/intro/index.html#intro). When installed it...

* Allows users to run various `varnish` versions

Of course, once a user is running their Varnish project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Basic Usage

Add a `varnish` service to your Landofile

```yaml
services:
  myservice:
    type: varnish
    backends:
      - appserver
    backend_port: 80
```

For more info you should check out the [docs](https://docs.lando.dev/varnish):

* [Getting Started](https://docs.lando.dev/varnish/)
* [Configuration](https://docs.lando.dev/varnish/config.html)
* [Guides](https://docs.lando.dev/varnish/accessing-logs.html)
* [Examples](https://github.com/lando/varnish/tree/main/examples)
* [Development](https://docs.lando.dev/varnish/development.html)

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/varnish/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/varnish/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/varnish/releases).


## Maintainers

* [@pirog](https://github.com/pirog)
* [@reynoldsalec](https://github.com/reynoldsalec)

## Contributors

<a href="https://github.com/lando/varnish/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/varnish" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](/LICENSE)
* [TERMS OF USE](https://docs.lando.dev/terms)
* [PRIVACY POLICY](https://docs.lando.dev/privacy)
* [CODE OF CONDUCT](https://docs.lando.dev/coc)

