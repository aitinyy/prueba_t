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
  var evento = '';

  if(req.body.queryResult && req.body.queryResult.parameters){
    if(req.body.queryResult.parameters.startRoutine){
      //empezamos la rutina
      speech = 'Vamos a empezar tu rutina.';
      evento = "CLEANSER_START";
      return res.json({

        "fulfillmentText": speech,
        "fulfillmentMessages": [
          {
            "text": {
              "text": [speech]
            }
          }
        ],
        "followupEventInput": {
            "name": evento,
            "languageCode": "es-ES"
            /*"parameters": {
              "param-name": "param-value"
            }*/
        },
        "source": "<webhookpn1>"
      
      
        });
    }else if(req.body.queryResult.parameters.removeMakeup){
      var statusWash = req.body.queryResult.parameters.removeMakeup;
      var informationText = '';
      var buttonCallBack = '';
      var infoCallBack = '';

      if(statusWash=='removeMakeup'){
        informationText = 'quitamos maquillaje';
        buttonCallBack = 'washFace';
        infoCallBack = 'lavamos cara';
        
      }
      else{
        informationText = 'lavamos la cara';
        buttonCallBack = 'skinConcern';
        infoCallBack = 'que preocupación tienes';
      } 

      return res.json({
        "fulfillmentText": '',
        "fulfillmentMessages": [
          {
            "payload": {
              /*"telegram": {
                "parse_mode": "Markdown",
                "text": speech
              }*/
              "telegram": {
                "reply_markup": {
                  "inline_keyboard": [
                    [
                      {
                        "text": infoCallBack,
                        "callback_data": buttonCallBack
                      }
                    ]
                  ]
                },
                "text": informationText
              }
            },
            "platform": "TELEGRAM"
          }
        ],
        "source": "<webhookpn1>"
        });
      //
    }else if(req.body.queryResult.parameters.skinConcern){
      speech = 'la preocupacion es '+req.body.queryResult.parameters.skinConcern;

      var concern = req.body.queryResult.parameters.skinConcern;
      var moreConcern = ' ¿Tienes alguna preocupación más?';

      switch (concern){
        case 'Acné':
          speech = 'Producto para acné';
          break;
        case 'Manchas en la piel':
          speech = 'Producto para las manchas';
          break;
        case 'Arrugas':
          speech = 'Producto para las arrugas';
          break;
        case 'Poros':
          speech = 'Producto para los poros';
          break;
        case 'Piel sensible':
          speech = 'Producto para la piel sensible';
          break;
        case 'Piel muy seca':
          speech = 'Producto para la piel muy seca';
          break;
        case 'Piel grasa':
          speech = 'Producto para la piel grasa';
          break;
        case 'Textura en la piel':
          speech = 'Producto para la textura en la piel';
          break;
        default:
          speech = '¿Disculpa?';
          break;
      }

      return res.json({
        "fulfillmentText": speech,
        "fulfillmentMessages": [
          {
            "payload": {
              "telegram": {
                "reply_markup": {
                  "inline_keyboard": [
                    [
                      {
                        "text": 'si',
                        "callback_data": 'skinConcern'
                      },
                      {
                        "text": 'no',
                        "callback_data": 'no'
                      },
                    ]
                  ]
                },
                "text": speech+moreConcern,
              }
              
            },
            "platform": "TELEGRAM"
          }
        ],  
        "source": "<webhookpn1>"
        });

    }/*else if(req.body.queryResult.parameters.moreConcern){

      speech = 'Más preocupaciones';
      var evento = 'SKIN_CONCERN';

      return res.json({
        "fulfillmentText": speech,
        "fulfillmentMessages": [
          {
            "text": {
              "text": [speech]
            }
          }
        ],
        "followupEventInput": {
            "name": evento,
            "languageCode": "es-ES"
        },
        "source": "<webhookpn1>"
      });
    }*/
    else{
      speech = '¿Disculpa?';
    }

  }

  


});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});


