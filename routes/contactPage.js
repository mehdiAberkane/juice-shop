/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/contact-ag2r

const utils = require('../lib/utils')
const models = require('../models/index')

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('apres le sqli');
    }, 5000);
  });
}

async function asyncCall(author, comment) {
  console.log('avant le sqli');
  const result = await resolveAfter2Seconds();
  models.sequelize.query("INSERT INTO contact_ag2rs (author, comment) VALUES ('"+author+"', '"+comment+"');")

  /*
  models.sequelize.query("INSERT INTO contact_ag2rs (author, comment) VALUES ('"+author+"', '"+comment+"');").then((aa) => {
    console.log(aa)
  }).catch(error => {
    console.log(error)
  })

  */

  console.log(result);
}

module.exports = function contactPage () {
  return (req, res, next) => {
/*
    models.sequelize.query(`CREATE TABLE contacts_ag2r (
      contact_id INTEGER PRIMARY KEY,
      author TEXT NOT NULL,
      comment TEXT NOT NULL
    );`)
*/
    asyncCall(req.body.author, req.body.comment)
    //models.sequelize.query(`DROP TABLE contact_ag2rs;`)
/*
    models.sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
      console.log('// Tables in database','==========================');
      console.log(tableObj);
    })
    .catch((err) => {
        console.log('showAllSchemas ERROR',err);
    })
*/

    models.sequelize.query('SELECT * FROM contact_ag2rs').then(([data]) => {
      const dataJson = utils.queryResultToJson(data)
      console.log(dataJson)
    })

    res.status(200).json({
        status: 'Working',
        data: {reponse: 'Message sauvegarder, merci'}
      })
  }
}
