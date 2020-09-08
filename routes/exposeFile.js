/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /test/ect...

const utils = require('../lib/utils')
const models = require('../models/index')
const fs = require('fs');

function testFolder () {
  return (req, res) => {

    res.status(200).json({
        status: 'Working',
        data: {reponse: 'Vuln folder'}
      })
  }
}

module.exports = {
  testFolder
}
