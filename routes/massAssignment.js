/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const utils = require('../lib/utils')
const models = require('../models/index')
const challenges = require('../data/datacache').challenges
const users = require('../data/datacache').users
const config = require('config')

module.exports = function massAssignment () {
  return (req, res, next) => {
    var name = ''

    if (req.method == 'POST') {
      name = req.body.name
    } else {
      name = req.query.name
    }

    models.sequelize.query("SELECT * FROM Products where name LIKE '"+name+"%'").then((results) => {
      var datahacked = utils.queryResultToJson(results)

      res.status(200).json({
        status: 'Working',
        data: {reponse: datahacked.data[0]}
      })
    }).catch(error => {
      console.log(error)
    })
  }
}
