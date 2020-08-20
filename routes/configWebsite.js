/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/config-website

const utils = require('../lib/utils')
const models = require('../models/index')
const cookieParser = require('cookie-parser')
const escape = require('escape-html')
const serialize = require('node-serialize')

module.exports = function configWebsite () {
  return (req, res) => {
    console.log('The value of TOTO is:', process.env.TOTO)
    
    if (req.cookies.profile) {
      var str = new Buffer(req.cookies.profile, 'base64').toString();
      var obj = serialize.unserialize(str);
      if (obj.username) {
        res.send("Hello " + escape(obj.username))
      }
    } else {
        res.cookie('profile', "eyJ1c2VybmFtZSI6InVua25vd24iLCJjb3VudHJ5IjoidW5rbm93biIsImNpdHkiOiJ1bmtub3duIn0=", {
          maxAge: 900000,
          httpOnly: true
        });

        res.status(200).json({
          status: 'Working',
          data: {reponse: 'Config website okay'}
        })
    }
  }
}
