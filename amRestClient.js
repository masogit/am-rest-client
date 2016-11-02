/**
 * Maso on 10/13/2016.
 */

require('babel-register');
require('babel-polyfill');

var config = {
    host: '16.103.21.241',
    port: 10081,
    user: 'admin',
    password: ''
};

process.argv.forEach(function (val, index, array) {
    if (index > 1)
        eval(val)();
});

process.on('unhandledRejection', (reason) => {
    console.log('Reason: ' + reason);
});

function schema() {
    var options = {
        query: 'schema'
    };

    amRestClient(config, options).then((data) => {
        console.log(data);
    });
}

function schemaOne() {
    var options = {
        query: 'schema/amAsset'
    };

    amRestClient(config, options).then((data) => {
        console.log(data);
    });
}

function query() {
    var options = {
        query: 'db/amComputer', 
        param: {
            fields: 'TcpIpHostname', 
            filter: '', 
            limit: 30, 
            offset: 0, 
            countEnabled: true
        }, 
        method: 'get'
    };

    amRestClient(config, options).then((data) => {
        console.log(data);
    });
}

/**
 * config: {server, port, user, name}
 * options: {query, collection, param, method, data}
 * - query: ['db/amTable', 'db/amTable/id', 'db/amTable/id/collection', 'schema', 'schema/amTable', 'schema/amTable/field', 'schema/amTable/link']
 * - param: {fields, filter, limit, offset, orderby, countEnabled}
 */
function amRestClient(config, options) {
  if (!options.method)
    options.method = 'get';

  var http = config.http ? require(config.http) : require('http'); // http or https
  var url = "${http}://${server}:${port}/${context}/${query}";
  var auth = (config.user != "") ? 'Basic ' + new Buffer(config.user + ':' + config.password).toString('base64') : undefined;

  var args = {
    path: {
      http: config.http ? config.http : 'http',
      server: config.host,
      port: config.port,
      context: "AssetManagerWebService/rs/v1",
      query: options.query
    },
    parameters: options.param,
    data: options.data,
    headers: (auth) ? {
      "Content-Type": "application/json",
      "Authorization": auth
    } : undefined
  };


  var promise = new Promise((resolve, reject) => {
    var request;
    var Client = require('node-rest-client').Client;
    var client = new Client();
    if (options.method == "get") {
      request = client.get(url, args, function (data) {
        resolve(data);
      }).on('error', function (err) {
        console.log(JSON.stringify(args));
        reject(err);
      });
    } else if (options.method == "post") {
      request = client.post(url, args, function (data, response) {
        resolve(data);
      }).on('error', function (err) {
        reject(err);
      });
    } else if (options.method == "put") {
      request = client.put(url, args, function (data, response) {
        resolve(data);
      }).on('error', function (err) {
        reject(err);
      });
    } else if (options.method == "delete") {
      request = client.delete(url, args, function (data, response) {
        resolve(data);
      }).on('error', function (err) {
        reject(err);
      });
    }

    // console.log("AM RestClient request.options: " + JSON.stringify(request.options));
    request.on('error', function (err) {
      reject(err);
    });
  });

  return promise;
};