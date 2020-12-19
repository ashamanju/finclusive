const axios = require('axios');
const querystring = require('querystring');
const config = require('../lib/config');
//const logger = require('../lib/logger').getLogger(__filename);

// authenticate the tenant with the clientId and clientSecret
function authRequest(authRequestData) {
  console.log("Method authRequest of Authentication Service -- Begin");
  
  return new Promise((resolve, reject) => {
    const clientStr = `client`;
    if (config.tenants[clientStr] == null) {
      console.log('authRequest', 'Error.');
      const errorResonse = { status: 404, message: 'Tenant not registered', referenceNumber: authRequestData.referenceNumber };
      reject(errorResonse);
      return;
    }
    
    const data = querystring.stringify({
      grant_type: config.app.grant_type,
      client_id: config.tenants[clientStr].clientId,
      client_secret: config.tenants[clientStr].clientSecret
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };
    console.log("Method authRequest of Authentication Service -- Data ", data);
    axios.post(config.app.authorizationUrl, data, headers).then((res) => {
      console.log("Method authRequest of Authentication Service --Authorised ", res.data);
      //logger.debug('authRequest', `Tenant authorized${authRequestData.clientId} :: ${authRequestData.referenceNumber}`);
      resolve({
        code: 200,
        data: res.data,
        referenceNumber: authRequestData.referenceNumber,
      });
      
  }).catch( (error)=> {
    if (error.response == null || error.response.status === 404) {
      console.log("Method authRequest of Authentication Service --FFDC service down :: ");
      const errorResponse = { status: 404, message: 'FFDC Service Not Available', referenceNumber: authRequestData.referenceNumber };
      reject(errorResponse);
    } else if (error.response != null && error.response.data != null && error.response.status === 400) {
      console.log("Method authRequest of Authentication Service --FFDC service error :: ",`${error.response.data}`);
      const errorResponse = {
        status: error.response.status,
        message: error.response.data.error_description,
        referenceNumber: authRequestData.referenceNumber,
      };
      reject(errorResponse);
    } else {
      console.log("Method authRequest of Authentication Service --Generic error :: ",`${error.response}`);
      reject(error.response);
    }
  });
  });

}
module.exports.authRequest = authRequest;


