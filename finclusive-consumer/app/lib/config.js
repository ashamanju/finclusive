const env = process.env.NODE_ENV || 'dev';

const dev = {
    app: {
      port: parseInt(process.env.DEV_APP_PORT) || 5000,
      authorizationUrl: 'https://api.lobdev.fusionfabric.cloud/login/v1/sandbox/oidc/token',
      consumersearchUrl:'retail-us/customer-read/v1/consumers',
      baseUrl: 'https://api.lobdev.fusionfabric.cloud/',
      grant_type: 'client_credentials',
    },
    db: {
      host: process.env.DEV_DB_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT) || 27017,
      name: process.env.DEV_DB_NAME || 'taskgo'
    },
    tenants: {
      client: {
        clientId: '7d09d50a-5a75-4462-8f9c-8adae9325a7a',
        clientSecret:'2f23892a-5768-4baa-a72f-719f46ef2165',
      },
    }
   };
   
const test = {
    app: {
      port: parseInt(process.env.TEST_APP_PORT) || 6000
    },
    db: {
      host: process.env.TEST_DB_HOST || 'localhost',
      port: parseInt(process.env.TEST_DB_PORT) || 27017,
      name: process.env.TEST_DB_NAME || 'taskgo'
    }
   };

const prod = {
    app: {
      port: parseInt(process.env.TEST_APP_PORT) || 7000
    },
    db: {
      host: process.env.PROD_DB_HOST || 'localhost',
      port: parseInt(process.env.PROD_DB_PORT) || 27017,
      name: process.env.PROD_DB_NAME || 'taskgo'
    }
   };   
   
const config = {
    dev,
    prod,
    test
   };

module.exports = config[env];