
module.exports = function(config) {
  var config = config;

  return {
    schema: (name) => {
      var options = { query: '' };
      if(name)
        options.query = 'schema/' + name;
      else
        options.query = 'schema';
      
      return amRestClient(config, options);
    },

    query: (options) => {
      return amRestClient(config, options);
    }
  }
};

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