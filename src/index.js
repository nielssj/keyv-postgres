'use strict';

const KeyvSql = require('@keyv/sql');
const { Pool } = require('pg');

class KeyvPostgres extends KeyvSql {
	constructor(opts) {
		opts = Object.assign({
			dialect: 'postgres',
			uri: 'postgresql://localhost:5432'
		}, opts);
		
		// Add custom SSL configuration, if "sslmode" present in connectionString (Work around issue with self-signed certs: https://github.com/brianc/node-postgres/issues/2009)
		let ssl
		let connectionString = opts.uri
		const sslIndex = inputString.indexOf("sslmode")
		if (sslIndex > 0) {
			connectionString = connectionString.substring(0, sslIndex - 1)
			ssl = { rejectUnauthorized: false }
		}

		opts.connect = () => Promise.resolve()
			.then(() => {
				const pool = new Pool({ connectionString, ssl });
				return sql => pool.query(sql)
					.then(data => data.rows);
			});

		super(opts);
	}
}

module.exports = KeyvPostgres;
