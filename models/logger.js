/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

module.exports = (sequelize, { INTEGER, STRING }) => {
  const Logger = sequelize.define('logger', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    log: {
      type: STRING,
      unique: false
    },
  }
  )
  
  return Logger
}
