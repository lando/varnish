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
# Should serve over https if specified
lando ssh -s curly -c "curl https://custom_ssl.lando.internal | grep sophisticated"

# Should use a custom vcl file if specified
lando ssh -s custom -c "cat /etc/varnish/lando.vcl | grep LANDOVARNISH"
lando ssh -s custom -c "env | grep LANDO_CUSTOM_VCL | grep YOUBETCHA"
lando ssh -s curly -c "curl -I custom.lando.internal" | grep X-Lando-Varnish | grep capes

# Should inherit overrides from its generator
lando ssh -s custom -c "env | grep MEGAMAN | grep X"
lando ssh -s custom_ssl -c "env | grep MEGAMAN | grep X"

# Should use a custom backend port when specified
lando ssh -s curly -c "curl http://customport.lando.internal | grep SAW"

# Should use a custom backend port with SSL if specified
lando ssh -s curly -c "curl https://customport_ssl.lando.internal | grep SAW"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
