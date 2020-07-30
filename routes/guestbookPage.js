/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/guestbook

const models = require('../models/index')
const libxmljs = require("libxmljs2")

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
  /*
  models.sequelize.query("INSERT INTO guestbooks (author, comment) VALUES ('"+author+"', '"+comment+"');").then((result) => {
    console.log('toutvabien')
  }).catch(error => {
    console.log(error)
  })
  */
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
function getbookPage () {
  return (req, res, next) => {

    models.sequelize.query("SELECT * FROM guestbooks order by id desc LIMIT 1;").then((result) => {
      console.log(result)
      }).catch(error => {
        console.log(error)
      })

    res.status(200).json({
      status: 'Working',
      data: {reponse: 'Message sauvegarder, guestbook get'}
    })
  }
}


module.exports = {
  postbookPage,
  getbookPage,
}
