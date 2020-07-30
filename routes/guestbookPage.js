/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/guestbook

const utils = require('../lib/utils')
const models = require('../models/index')
const fs = require('fs')
const libxmljs = require("libxmljs2")
const xmlparser = require('express-xml-bodyparser')


function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('apres le sqli');
    }, 2000);
  });
}

async function asyncCall(author, comment) {
  const result = await resolveAfter2Seconds();  
  models.sequelize.query("INSERT INTO guestbooks (author, comment) VALUES ('"+author+"', '"+comment+"');").then((result) => {
    console.log('toutvabien')
  }).catch(error => {
    console.log(error)
  })
}

//post
function postbookPage () {
  return (req, res, next) => {
    //asyncCall(req.body.author, req.body.comment)

    var options = {
      noent: true,
      dtdload: true
    }

    console.log(typeof req.body)

    var xmlDoc = libxmljs.parseXml(req.body.toString(), options);

    res.status(200).json({
        status: 'Working',
        data: {reponse: xmlDoc}
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
