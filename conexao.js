const { Pool } = require('pg');
const { param } = require('./rotas');

const pool = new Pool ({
user: 'postgres',
host: 'localhost',
database: 'rede_social',
password: '123456',
port: 5432

});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
query

}