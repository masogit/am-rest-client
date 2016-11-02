var Rest = require('../src/amRestClient');

var config = {
    host: '16.103.21.241',
    port: 10081,
    user: 'admin',
    password: ''
};

var rest = new Rest(config);

process.argv.forEach(function (val, index, array) {
    if (index > 1)
        eval(val)();
});

process.on('unhandledRejection', (reason) => {
    console.log('Reason: ' + reason);
});

function schema() {
    rest.schema().then((data) => {
        console.log(data);
    });
}

function schemaOne() {
    rest.schema('amNews').then((data) => {
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

    rest.query(options).then((data) => {
        console.log(data);
    });
}
