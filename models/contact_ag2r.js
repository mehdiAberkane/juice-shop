/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

/* jslint node: true */
module.exports = (sequelize, { INTEGER, STRING }) => {
  const ag2r = sequelize.define('contact_ag2r', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    author: {
      type: STRING,
      unique: false
    },
    comment: {
      type: STRING,
      unique: false
    }
  }, {
    timestamps: false
  }
  )
  return ag2r
}
