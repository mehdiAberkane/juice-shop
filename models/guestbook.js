/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

/* jslint node: true */
module.exports = (sequelize, { INTEGER, STRING }) => {
  const guestbook = sequelize.define('guestbook', {
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
  return guestbook
}
