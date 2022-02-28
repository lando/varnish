---
title: Varnish Lando Plugin
description: Add a highly configurable varnish service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# Varnish

[Varnish Cache](https://varnish-cache.org/intro/index.html#intro) is a web application accelerator also known as a caching HTTP reverse proxy. You install it in front of any server that speaks HTTP and configure it to cache the contents.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config/lando.html).

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
*   [custom](https://docs.lando.dev/config/services.html#advanced)

## Patch versions

This service does not support patch versions but if you **really** need something like that, you could consider using either a [custom compose service](https://docs.lando.dev/compose) or a service [overrides](https://docs.lando.dev/config/services.html#overrides).

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "yarn add @lando/varnish" line to install a particular version eg
# yarn add @lando/varnish@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add @lando/varnish --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/varnish \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/varnish /plugins/@lando/varnish"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/varnish
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/varnish`. This command will also show you _where_ the plugin is being loaded from.
