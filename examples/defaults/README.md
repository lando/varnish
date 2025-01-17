# Varnish Defaults Example

This example exists primarily to test the following documentation:

* [Varnish Service](https://docs.devwithlando.io/tutorials/varnish.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use varnish 4.x by default
lando exec defaults -- varnishd -V 2>&1 | grep varnish-4

# Should backend from appserver by default
lando exec defaults -- curl localhost | grep sophisticated
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
