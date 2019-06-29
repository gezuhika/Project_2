module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    driverName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,60]
      }
    },
    YMM: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,60]
      }},
    departAddress: DataTypes.TEXT,
    destAddress: DataTypes.TEXT,
    departTime: DataTypes.STRING,
    numSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isNumeric: true
            }
  }});
  return Example;
};
