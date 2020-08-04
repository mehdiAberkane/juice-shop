/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/guestbook

const utils = require('../lib/utils')
const models = require('../models/index')
const libxmljs = require("libxmljs2")
const parseString = require('xml2js').parseString;

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('apres le sqli');
    }, 5000);
  });
}

async function asyncCall(req) {
  const result = await resolveAfter2Seconds();
  var options = {
    noent: true,
    dtdload: true
  }

  var xmlDoc = libxmljs.parseXml(req.body, options);

  console.log(xmlDoc.toString());
  
  parseString(req.body, function (err, result) {
      models.sequelize.query("INSERT INTO guestbooks (author, comment) VALUES ('"+result.xml.root[0].author.toString()+"', '"+result.xml.root[0].comment.toString()+"');").then((result) => {
        console.log('toutvabien')
      }).catch(error => {
        console.log(error)
      })
  });
}

//post
function postbookPage () {
  return (req, res, next) => {
    asyncCall(req)

    res.status(200).json({
        status: 'Working',
        data: {reponse: 'toutvabien'}
      })
  }
}

//get
/*
function getbookPage () {
  return (req, res, next) => {
    const results = models.sequelize.query("SELECT * FROM guestbooks;").then()
    const data = utils.queryResultToJson(results)
    console.log(data)
    console.log(data.data)
    res.status(200).json({
      status: 'Working',
      data: {reponse: data}
    })
  }
}
*/

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
