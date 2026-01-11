'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      // Un Feedback aparține unei activități specifice
      Feedback.belongsTo(models.Activity, { foreignKey: 'activityId' });
    }
  }
  Feedback.init({
    reaction: DataTypes.STRING,
    activityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};