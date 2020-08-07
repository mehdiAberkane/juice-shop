/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/feedback-ag2r

const utils = require('../lib/utils')
const models = require('../models/index')
const libxmljs = require("libxmljs2")
const parseString = require('xml2js').parseString;

//get
function getonefeed () {
  return (req, res, next) => {
    models.sequelize.query("SELECT * FROM feedbacks order by id desc limit 1").then((results) => {
      const data = utils.queryResultToJson(results)
      var comment = data.data[0][0].comment.substr(0, data.data[0][0].comment.indexOf('('))

      models.sequelize.query("SELECT * FROM feedbacks where comment LIKE '"+comment+"%'").then((results) => {
        
        var datahacked = utils.queryResultToJson(results)

        res.status(200).json({
          status: 'Working',
          data: {reponse: datahacked.data[0]}
        })
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })
  }
}

module.exports = {
  getonefeed
}
