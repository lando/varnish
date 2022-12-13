Varnish Example
===============

This example exists primarily to test the following documentation:

* [Varnish Service](https://docs.devwithlando.io/tutorials/varnish.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use varnish 6.0.10 by user specification
lando ssh -s defaults -c "varnishd -V 2>&1 | grep varnish-6.0.11"

# Should backend from appserver by default
lando ssh -s defaults -c "curl localhost | grep sophisticated"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
