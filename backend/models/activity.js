'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      // O activitate aparține unui User
      Activity.belongsTo(models.User, { foreignKey: 'userId' });
      
      // O activitate are mai multe Feedback-uri
      Activity.hasMany(models.Feedback, { foreignKey: 'activityId' });
    }
  }
  Activity.init({
    access_code: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_time: DataTypes.DATE,
    duration_minutes: DataTypes.INTEGER,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};