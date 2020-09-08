/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/contact-ag2r

const utils = require('../lib/utils')
const models = require('../models/index')
const fs = require('fs');
const libxmljs = require("libxmljs2");
const mysql = require('mysql');
const xml2js = require('xml2js');

var conmysql = mysql.createConnection({
  host: 'localhost',
  user: 'juice',
  password: 'juice'
});

conmysql.connect(function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("MySql Connected!");
  }
});

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('apres le sqli');
    }, 2000);
  });
}

async function asyncCall(author, comment) {
  models.sequelize.query('SELECT * FROM contact_ag2rs WHERE author LIKE :search_name ',
    { replacements: { search_name: author  }, type: models.sequelize.QueryTypes.SELECT }
  ).then(projects => {
    console.log(projects)
  })

  //const result = await resolveAfter2Seconds()
  models.sequelize.query("INSERT INTO contact_ag2rs (author, comment) VALUES ('"+author+"', '"+comment+"');").then((result) => {

  }).catch(error => {
    console.log(error)
  })
}

//save email in mysql db
async function asyncCallMysql(email) {
  conmysql.changeUser({database : 'juice'}, function(err) {
    if (err) {
      console.log(err)
    }
  });

  let query = "INSERT INTO user (email) VALUE ('"+email+"')"
  try {

  } catch (er) {
    conmysql.query(query, function (err, result) {
      if (err) throw err;
    });
  }
}

module.exports = function contactPage () {
  return (req, res) => {

    asyncCall(req.body.author, req.body.comment)
    asyncCallMysql(req.body.email)
    
    res.status(200).json({
        status: 'Working',
        data: {reponse: 'Data save, thanks'}
      })
  }
}
