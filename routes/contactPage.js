/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/contact-ag2r

const utils = require('../lib/utils')
const models = require('../models/index')
const challenges = require('../data/datacache').challenges
const users = require('../data/datacache').users
const config = require('config')

module.exports = function contactPage () {
  return (req, res, next) => {
    /*models.sequelize.query(`CREATE TABLE contacts_ag2r (
      contact_id INTEGER PRIMARY KEY,
      author TEXT NOT NULL,
      last_name TEXT NOT NULL
    );`)

    //models.sequelize.query(`DROP TABLE contacts_ag2r;`)

    models.sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
      console.log('// Tables in database','==========================');
      console.log(tableObj);
    })
    .catch((err) => {
        console.log('showAllSchemas ERROR',err);
    })

    */

    models.sequelize.query("INSERT INTO contacts_ag2r (author, last_name) VALUES ('"+req.body.author+"', '"+req.body.comment+"');")

    models.sequelize.query('SELECT * FROM contacts_ag2r').then(([data]) => {
      const dataJson = utils.queryResultToJson(data)
      console.log(dataJson)
    })

    //console.log(contacts)
    //console.log(req.body.comment)

    res.status(200).json({
        status: 'Working',
        data: {reponse: 'ça marche bien'}
      })
  }
}
