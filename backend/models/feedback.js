'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Feedback apartine unei activitati specifice
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