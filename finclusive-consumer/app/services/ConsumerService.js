const axios = require('axios');
const querystring = require('querystring');
const config = require('../lib/config');

async function searchConsumer(consumerData){
    console.log("Method searchConsumer of Consumer Service -- Begin");
    const consumerSearchUrl = `${config.app.baseUrl}${config.app.consumersearchUrl}?firstName=${consumerData.firstName}`;
    console.log("Method searchConsumer of Consumer Service -- consumerSearchUrl",consumerSearchUrl);
    console.log("Method searchConsumer of Consumer Service -- Token",`Bearer ${consumerData.token}`);
    var returnData;
    const header = {
        headers:
            {
              Authorization: `Bearer ${consumerData.token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
      };
      console.log("Method searchConsumer of Consumer Service -- Headers",header);
        var data = await axios.get(consumerSearchUrl , header).then((res) => {
            console.log("Method searchConsumer of Consumer Service -- Inside then ",res );
            returnData = res.data;
        });
        console.log("Method searchConsumer of Consumer Service -- Return Data",returnData );
        console.log("Method searchConsumer of Consumer Service -- End " );
        return returnData;
}
module.exports.consumer = searchConsumer;