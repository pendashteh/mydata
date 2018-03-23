# MyData
A distributed app that allows you to hold and control your data

## Installation and Usage
This is a Holochain app.
Check out Holochain Developer Portal for more instruction:
https://developer.holochain.org/


### Set up:
```
$ git clone git@github.com:pendashteh/mydata.git mydata
$ cd mydata
```

### Run the UI:
```
$ ./hc-web
```
And then open http://127.0.0.1:4141

### Run two agents:
You need to open tw terminal.
In the first one, run:
```
$ ./hc-web
```

And on the second, rnu this:
```
$ ./hc-web 4142
```

Now you can open two browser tabs: http://127.0.0.1:4141/ and http://127.0.0.1:4142/

### Run tests
To run all tests run:
```
$ ./hc-test
```
You can also specify the name of the test you want to run.

To run a scenario, run the following command to get the list of options:
```
$ ./hc-scenario
```

Now, specify the name of the scenario you want to run, fo example "readpublicprofile"
```
$ ./hc-scenario readpublicprofile
```

## Helper scripts
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

