---
title: Varnish Lando Plugin
description: Add a highly configurable varnish service to Lando for local development with all the power of Docker and Docker Compose.
---

# Varnish

[Varnish Cache](https://varnish-cache.org/intro/index.html#intro) is a web application accelerator also known as a caching HTTP reverse proxy. You install it in front of any server that speaks HTTP and configure it to cache the contents.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/services/lando-3.html) top-level config in your [Landofile](https://docs.lando.dev/landofile/).

```yaml
services:
  myservice:
    type: varnish:6.0
    backend: appserver
    backend_port: 80
```

## Supported versions

*   [6.0](https://hub.docker.com/r/wodby/varnish)
*   [6](https://hub.docker.com/r/wodby/varnish)
*   [custom](https://docs.lando.dev/services/lando-3.html#overrides)

## Legacy versions

::: warning Using Unsupported Varnish Versions!
While you can currently use some [EOL Varnish versions](https://endoflife.date/varnish) with Lando, it's worth noting that we also do not support such versions, so your mileage may vary. If you are having issues with unsupported versions and open a ticket about it, the most likely response you will get is "upgrade to a supported version".
:::

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [4.1](https://hub.docker.com/r/wodby/varnish)
*   [4](https://hub.docker.com/r/wodby/varnish)

## Patch versions

This service does not support patch versions but if you **really** need something like that, you could consider using either a [custom compose service](https://docs.lando.dev/plugins/compose) or a service [overrides](https://docs.lando.dev/services/lando-3.html#overrides).

