/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

//path: /api/contact-ag2r

const utils = require('../lib/utils')
const models = require('../models/index')
const fs = require('fs');
const libxmljs = require("libxmljs");

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('apres le sqli');
    }, 2000);
  });
}

async function asyncCall(author, comment) {
  const result = await resolveAfter2Seconds();  
  models.sequelize.query("INSERT INTO contact_ag2rs (author, comment) VALUES ('"+author+"', '"+comment+"');").then((result) => {
    models.sequelize.query('SELECT * FROM contact_ag2rs order by id desc LIMIT 1').then(([data]) => {
      const dataJson = utils.queryResultToJson(data)
      var xml =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<note importance="high" logged="true">' +
        '    <title>'+dataJson.data[0].comment+'</title>' +
        '    <todo>Work</todo>' +
        '    <todo>Play</todo>' +
        '</note>';

        var xml =
        '<?xml  version="1.0" encoding="ISO-8859-1"?>' +
        '<!DOCTYPE foo [' +
        '<!ELEMENT foo ANY >' +
        '<!ENTITY xxe SYSTEM  "file:/toto.txt" >]>' +
        '<foo>&xxe;</foo>' +
        '';

        var xml =  '<?xml version="1.0" encoding="UTF-8"?>' +
                    '<!DOCTYPE root [ <!ENTITY bar SYSTEM "file:/toto.txt"> ]>' +
                  '<root>' +
                      '<child foo="bar">' +
                          '<grandchild baz="fizbuzz">&bar;</grandchild>' +
                      '</child>' +
                      '<sibling>with content!</sibling>' +
                      '<thai>&bar;</thai>'+
                  '</root>';
        var options = {
            noent: true,
            dtdload: true
        }

        var xmlDoc = libxmljs.parseXml(xml, options);
        console.log(xmlDoc);

        var gchild = xmlDoc.get('//grandchild');

        console.log(gchild)

        var payload = libxmljs.parseXml(xml, {noent:true,noblanks:true, dtdload: true})

        //console.log(payload)
        //console.log(payload.get('/foo'))

        fs.writeFile('test.xml', xml, (err) => {
          if (err) throw err;

          fs.readFile('test.xml', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }

            console.log(data);
          });
      });
    })

  }).catch(error => {
    console.log(error)
  })
}

module.exports = function contactPage () {
  return (req, res, next) => {
    asyncCall(req.body.author, req.body.comment)

    res.status(200).json({
        status: 'Working',
        data: {reponse: 'Message sauvegarder, merci'}
      })
  }
}
