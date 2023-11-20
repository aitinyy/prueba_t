"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  /*var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again."+req.body;
      */

  var speech = 'Hola';

  if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.startRoutine){
    //empezamos la rutina
    speech = 'Vamos a empezar tu rutina.';
    speech2 = '¿Quieres utilizar limpiador?';
  }else{
    speech = '¿Disculpa?';
  }

  return res.json({

  "fulfillmentText": speech,
  "fulfillmentMessages": [
    {
      "text": {
        "text": [speech]
      }
    },{
      "followupEventInput": {
        "name": "CLEANSER_START"
        /*"languageCode": "en-US",
        "parameters": {
          "param-name": "param-value"
        }*/
      }
    }
    
  ],
  "source": "<webhookpn1>"


  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
