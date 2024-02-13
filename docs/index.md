---
title: Varnish Lando Plugin
description: Add a highly configurable varnish service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# Varnish

[Varnish Cache](https://varnish-cache.org/intro/index.html#intro) is a web application accelerator also known as a caching HTTP reverse proxy. You install it in front of any server that speaks HTTP and configure it to cache the contents.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/core/v3/lando-service.html) top-level config in your [Landofile](https://docs.lando.dev/core/v3).

```yaml
services:
  myservice:
    type: varnish
    backends:
      - appserver
    backend_port: 80
```

## Supported versions

*   [6.0](https://hub.docker.com/r/wodby/varnish)
*   [6](https://hub.docker.com/r/wodby/varnish)
*   **[4.1](https://hub.docker.com/r/wodby/varnish)** **(default)**
*   [4](https://hub.docker.com/r/wodby/varnish)
*   [custom](https://docs.lando.dev/core/v3/lando-service.html#overrides)

## Patch versions

This service does not support patch versions but if you **really** need something like that, you could consider using either a [custom compose service](https://docs.lando.dev/plugins/compose) or a service [overrides](https://docs.lando.dev/core/v3/lando-service.html#overrides).

