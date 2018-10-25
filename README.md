# service-product-recommendations

## Get start
### Server
1. The server port is set to 3007.
2. run `npm start` to start the server

### Init DB
1. run `sequelize db:create` to start the PG database
2. run `sequelize db:migrate` for database migration 

### Seed data for DB
1. run `sequelize db:seed:all`
2. run `sequelize db:seed:undo:all`

### Drop DB
1. We can run `sequelize db:drop` to drop the db

### Seed data
1. run `node libs/helpers/import-seed-data.js`

### Test server
run `npm test-server` 