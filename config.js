const env = process.env.NODE_ENV || 'development'

console.log(env);

const config = {
  // 生产模式
  production: {
    apiToken: 'vGf-mR-S.24848.34H_c4JpLdsX',

    port: 3000,

    sequelize: {
      database: 'tp_bts_staging',
      username: 'deploy',
      password: 'PeeFDt3LXUDP',
      port: '5432',
      host: '10.29.113.245',
      dialect: 'postgres'
    }
  },
  // 开发模式
  development: {
    apiToken: 'vGf-mR-S.24848.34H_c4JpLdsX',

    port: 3000,
    sequelize: {
      database: 'postgres',
      username: 'postgres',
      password: 'postgres',
      port: '5432',
      host: 'localhost',
      dialect: 'postgres'
    }
  }
}

module.exports = config[env]