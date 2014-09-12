# Module Repository

module for work with data in repositories

## Usage
```
npm install git+https://github.com/Asimplia/module-repository.git --save
```

### Javascript
```
var Repository = require('asimplia-repository');
// Connection to Databases
Repository.connectMongoDB('mongodb://localhost:27017/test');
Repository.connectPostgres('postgres://postgres@localhost/test');
Repository.connectNeo4j('http://localhost:7474/');
```

### TypeScript
```
/// <reference path="./path/to/asimplia-repository/index.node.d.ts" />
import Repository = require('asimplia-repository');
// Connection to Databases
Repository.connectMongoDB('mongodb://localhost:27017/test');
Repository.connectPostgres('postgres://postgres@localhost/test');
Repository.connectNeo4j('http://localhost:7474/');
```

## Documentation
Look at ```./tests/``` for full API of module


## Used database systems:
* MongoDB
* PostgreSQL
* Neo4j


## System Dependencies
* Node.js >= 0.10.15
* Npm package system >= 1.2.18

