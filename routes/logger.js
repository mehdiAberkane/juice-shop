/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/logger

const utils = require('../lib/utils')
const models = require('../models/index')

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('after');
    }, 1000);
  });
}
  
async function asyncCall(req) {
  const result = await resolveAfter2Seconds();
  await models.logger.create({log: req.body.log });
}
  
//post
function postLogger () {
  return (req, res, next) => {
    asyncCall(req)

    res.status(200).json({
        status: 'Working',
        data: {reponse: '200 ok'}
      })
  }
}

//get
function getAllLogger () {
  return (req, res, next) => {
    if (typeof req.cookies.ag2r !== 'undefined' && req.cookies.ag2r == 'admin_mode') {
      models.sequelize.query("SELECT * FROM loggers").then((results) => {
        const data = utils.queryResultToJson(results)
          
        res.render('logger', { title: 'Logger Page', message: 'Logger Page', data: data.data[0]});
  
      }).catch(error => {
        console.log(error)
      })
    } else {
      res.status(404).json({
        status: 'Not found',
        data: {reponse: 'Not found'}
      })
    }
  }
}
  
module.exports = {
  postLogger,
  getAllLogger,
}