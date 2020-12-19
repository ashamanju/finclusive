
const authService = require('../services/AuthenticationService');
const consumerService = require('../services/ConsumerService');

exports.consumerSearch = (request, response) => {
    console.log("Method consumerSearch of Connsumer Handler -- Begin");
    console.log("Method consumerSearch of Connsumer Handler -- Request--", request);
    
    const authRequestData = {referenceNumber: request.referenceNumber};
    console.log("Method consumerSearch of Consumer Handler-- Before Calling auth service");
    response.setHeader( 'Access-Control-Allow-Origin', '*');
    authService.authRequest(authRequestData)
    . then( (authResult)=>{
      console.log("Method consumerSearch of Consumer Handler-- Auth Resolved");
      
        const consumerData = {
          firstName: request.params.firstNameSent.trim(),
          token: authResult.data.access_token.trim(),
          referenceNumber: authResult.referenceNumber
      };
      console.log("Method consumerSearch of Consumer Handler-- First Name",consumerData.firstName);
      consumerService.consumer(consumerData).then((result)=>{
        console.log("Method consumerSearch of Consumer Handler-- Consumer Search successfull",result);
        response.status(200);
        response.send(result);
      }).catch( (error)=>{
        console.log("Method consumerSearch of Consumer Handler-- Consumer Search error",error);
        console.log('error', error);
        response.status(404);
        response.send(error);
      });
      }).catch( (error)=>{
        console.log("Method consumerSearch of Consumer Handler-- Consumer Search error",error);
        response.status(404);
        response.send(error);
      })
  };



  exports.auth =(request, response) => {
  //   console.log("Method auth of Consumer Handler-- Begin");
  //  // const authRequestData = {referenceNumber: request.referenceNumber};
  //   console.log("Method auth of Consumer Handler-- Calling auth service");
  //   //authService.authRequest(authRequestData)
  //   . then( ()=>{
  //       console.log('success');
  //       response.status(200);
  //       const res = { status: 200, fname: 'MOllie'};

  //     }).catch( ()=>{
  //       console.log('error');
  //     })
  console.log(request.params.firstNameSent.trim());
  
  response.setHeader( 'Access-Control-Allow-Origin', '*');
  response.setHeader( 'Content-Type', 'application/json');
  response.setHeader('Accept', 'application/json');
  response.status(200);
  response.send({status: '200', fname: 'Mollie',lname:'Ashford',phone:'+1 123 456 7890',address1:'201',address2:'John Avenue',city:'Houston',state:'Texas',zipcode:'77002'});
  };