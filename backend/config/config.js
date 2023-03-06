const env = process.env;

const development = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB,
  host: env.IP,
  dialect: 'mysql',
};

const test = {
  username: env.DB_USERNAME,
  password: null,
  database: env.DB_TEST,
  host: env.IP,
  dialect: 'mysql',
};

const production = {
  username: env.DB_USERNAME,
  password: null,
  database: env.DB_PRODUCTION,
  host: env.IP,
  dialect: 'mysql',
};

module.exports = { development, test, production };
