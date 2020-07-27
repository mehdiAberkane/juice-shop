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
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL UNIQUE
    );`)*/

    models.sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
      console.log('// Tables in database','==========================');
      console.log(tableObj);
    })
    .catch((err) => {
        console.log('showAllSchemas ERROR',err);
    })

    console.log(req)
    console.log(req.body.comment)
    res.status(200).json({
        status: 'dsdsd',
        data: {}
      })
  }
}
