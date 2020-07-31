/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/contact-ag2r

const utils = require('../lib/utils')
const models = require('../models/index')
const fs = require('fs');
const libxmljs = require("libxmljs2");

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('apres le sqli');
    }, 2000);
  });
}

async function asyncCall(author, comment) {
  const result = await resolveAfter2Seconds();  
  models.sequelize.query("INSERT INTO contact_ag2rs (author, comment) VALUES ('"+author+"', '"+comment+"');").then((result) => {
    
    //check the data have been save
    //models.sequelize.query('SELECT * FROM contact_ag2rs WHERE author = "'+author+'" order by id desc LIMIT 1').then(([data]) => {
    models.sequelize.query('select load_extension("//dsdsaaaddsd")').then(([data]) => {
      const dataJson = utils.queryResultToJson(data)
      console.log(dataJson)
    })

  }).catch(error => {
    console.log(error)
  })
}

module.exports = function contactPage () {
  return (req, res, next) => {
    asyncCall(req.body.author, req.body.comment)

    res.status(200).json({
        status: 'Working',
        data: {reponse: 'Message sauvegarder, merci'}
      })
  }
}
