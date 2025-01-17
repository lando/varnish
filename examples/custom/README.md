# Varnish Custom Example

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
# Should also serve over https if specified
lando exec curl -- curl https://custom_ssl | grep sophisticated
lando exec curl -- curl https://customport_ssl | grep SAWGUERROA

# Shoule use a custom vcl file if specified
lando exec custom -- cat /etc/varnish/lando.vcl | grep LANDOVARNISH
lando exec custom -- env | grep LANDO_CUSTOM_VCL | grep YOUBETCHA
lando exec custom -- curl -I localhost | grep X-Lando-Varnish | grep capes

# Should inherit overrides from its generator
lando exec custom -- env | grep MEGAMAN | grep X
lando exec custom_ssl -- env | grep MEGAMAN | grep X

# Should use a custom backend port when specified
lando exec customport -- curl http://localhost | grep SAW

# Should use a custom backend port with SSL if specified
lando exec customport_ssl -- curl https://localhost | grep SAW
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
