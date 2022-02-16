"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbFilm.belongsTo(models.tbCategory, {
        as: "category",
        foreignKey: {
          name: "idCategory",
        },
      });
      tbFilm.hasMany(models.tbTransaction, {
        as: "transaction",
        foreignKey: {
          name: "idFilm",
        },
      });
    }
  }
  tbFilm.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      tumbnail: DataTypes.STRING,
      filmUrl: DataTypes.STRING,
      price: DataTypes.INTEGER,
      idCategory: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbFilm",
    }
  );
  return tbFilm;
};
