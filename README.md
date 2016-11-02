# am-rest-client

It's a simple js am-rest-client

### Test

```
npm test
```

Or

```
node test schema
node test schemaOne
node test query
```

### example in nodejs

```
var amRestClient = require('am-rest-client');

var config = {
    host: '',
    port: 8081,
    user: 'admin',
    password: ''
};

var rest = new amRestClient(config);

rest.schema().then((data) => { // return all tables' schema
	console.log(data);
});
```

### API

- schema
    - table name
- query
    - options

    *all parameters used in am rest client:*
    ```
    /**
    * config: {server, port, user, name}
    * options: {query, collection, param, method, data}
    * - query: ['db/amTable', 'db/amTable/id', 'db/amTable/id/collection', 'schema', 'schema/amTable', 'schema/amTable/field', 'schema/amTable/link']
    * - param: {fields, filter, limit, offset, orderby, countEnabled}
    */
    ```

### Samples

- **schema**
    ```
    rest.schema('amComputer').then((data) => {
        console.log(data);
    });
    ```

- **query**
    ```
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

    rest.query(options).then((data) => {
        console.log(data);
    });
    ```