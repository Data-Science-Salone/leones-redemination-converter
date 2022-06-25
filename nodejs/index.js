'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
const helmet = require('helmet')
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

app.post('/convert',(req, res) => {
   let secret = req.body.secret
   
   if(secret !== WEBHOOK_SECRET) {
       res.status(404).end()
       return
   }

   if (req.body.event == 'incoming_message') {
        let content = req.body.content
        let conversion_request = content.split('*')
        let figure = conversion_request[0]
        let period = conversion_request[1].toString().toUpperCase()
        let denomination = 1

        if (period == 'NEW' || period == '2'){
            denomination = figure / 1000

        }else if(period == 'OLD' || period == '1'){
        denomination = figure * 1000
        } else {
        denomination = figure /1000

        }
      //autoreply
       res.json({
        messages: [
          { content: denomination }
        ]
      });

      res.status(200).end();
   }

})
app.listen(PORT)