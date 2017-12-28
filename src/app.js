var router = require('./router.js');

//Problem: Dynamically show temperature from temperature sensor. Temperature is writen to a file at a particular interaval
//Solution: Use Node.js to perform

//0. Parse Arguments
//Only 1 optional argument to run using demo mode which gets temperature from a local file rather than from temperature sensor
var args = parseArguments();

//1. Create a web Server
const http = require('http');

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.office(request, response);
});

server.listen(args.port, () => {
  console.log(`Server running at http://localhost:${args.port}/`);
});

function parseArguments() {
  var ArgumentParser = require('argparse').ArgumentParser;
  var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Office closed API, GET /office for tempertature, browser to / for toggle button'
  });
  parser.addArgument(['-p', '--port'], {
    action: 'store',
    type: 'int',
    required: false,
    help: 'Server port',
    dest: 'port',
    defaultValue: 3000
  });

  return parser.parseArgs();
}
