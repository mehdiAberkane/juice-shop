/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/guestbook

const utils = require('../lib/utils')
const models = require('../models/index')
const libxmljs = require("libxmljs2")
const parseString = require('xml2js').parseString
const exec = require('child_process').exec

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('apres le sqli');
    }, 5000);
  });
}

async function asyncCall(req) {
  const result = await resolveAfter2Seconds();
  let b64 = Buffer.from(req.body).toString('base64')

  console.log('hey')
  const myShellScript = exec('php php-vuln/xml.php ' + b64)

  myShellScript.stdout.on('data', (data)=>{
    console.log(data); 
  });
/*
  parseString(req.body, function (err, result_string) {
      models.sequelize.query("INSERT INTO guestbooks (author, comment) VALUES ('"+result_string.xml.root[0].author.toString()+"', '"+result_string.xml.root[0].comment.toString()+"');").then((result) => {
        console.log('toutvabien')
      }).catch(error => {
        console.log("INSERT INTO guestbooks fail")
      })
  });
*/
}

//post
function postbookPage () {
  return (req, res, next) => {
    asyncCall(req)

    res.status(200).json({
        status: 'Working',
        data: {reponse: '200 ok'}
      })
  }
}

//get
function getbookPage () {
  return (req, res, next) => {
    models.sequelize.query("SELECT * FROM guestbooks order by id desc limit 1").then((results) => {
      const data = utils.queryResultToJson(results)
      
      res.status(200).json({
        status: 'Working',
        data: {reponse: data.data[0][0]}
      })
    }).catch(error => {
      console.log(error)
    })
  }
}

module.exports = {
  postbookPage,
  getbookPage,
}
