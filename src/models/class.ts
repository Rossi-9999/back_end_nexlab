"use strict";

import { Model, UUIDV4 } from "sequelize";

interface ClassAttributes {
  id: string;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Class extends Model<ClassAttributes> implements ClassAttributes {
    id!: string;
    name!: string;

    static associate(models: any) {
      Class.belongsToMany(models.Student, {
        through: "ClassRegistrations",
      });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
