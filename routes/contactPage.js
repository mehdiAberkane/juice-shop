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
  
  models.sequelize.query('SELECT * FROM contact_ag2rs WHERE author LIKE :search_name ',
    { replacements: { search_name: 'naruto'  }, type: models.sequelize.QueryTypes.SELECT }
  ).then(projects => {
    console.log(projects)
  })

  const result = await resolveAfter2Seconds();  
  models.sequelize.query("INSERT INTO contact_ag2rs (author, comment) VALUES ('"+author+"', '"+comment+"');").then((result) => {

    /*
    //check the data have been save
    //models.sequelize.query('SELECT * FROM contact_ag2rs WHERE author = "'+author+'" order by id desc LIMIT 1').then(([data]) => {
    models.sequelize.query('select load_extension("//dsdsaaaddsd")').then(([data]) => {
    //models.sequelize.query("attach database '/net/rc752wcuose5e4m5ifm4nodmjdpdd2.burpcollaborator.net/z' as z;").then(([data]) => {
      const dataJson = utils.queryResultToJson(data)
      console.log(dataJson)
    })
    */

  }).catch(error => {
    console.log(error)
  })
}

module.exports = function contactPage () {
  return (req, res, next) => {
    console.log(req.body)
    asyncCall(req.body.author, req.body.comment)

    res.status(200).json({
        status: 'Working',
        data: {reponse: 'Data save, thanks'}
      })
  }
}
