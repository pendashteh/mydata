# MyData
A distributed app that allows you to hold and control your data

## Install
This is a Holochain app.
Check out Holochain Developer Portal for more instruction:
https://developer.holochain.org/

## Helper Scripts

You can use the following scripts to run and test the app from command line (CLI):

`./hc-web [PORT]`: Runs an agent, listening to the given port. (4141 by default)

`./hc-test [TEST_NAME]`: Runs all tests or the test specified.

`./hc-scenario [SCENARIO_NAME]`: Lists available scenarios or run the specified one.

## Development

To run the app for development run the following command in the app directory:

`$ hcdev --no-nat-upnp -debug web`

To run tests:

`$ hcdev --no-nat-upnp -debug test`

To run a test chain (a.k.a scenario):

`$ hcdev --no-nat-upnp -debug --mdns=true scenario {scenario name}`

