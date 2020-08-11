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
    console.log('kikou')
    res.status(200).json({
        status: 'Coucou',
        data: {}
      })
  }
}
