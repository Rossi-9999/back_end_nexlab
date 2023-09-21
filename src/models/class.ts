"use strict";

import { Model, UUIDV4 } from "sequelize";

interface ClassAttributes {
  id: string;
  name: string;
  status: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Class extends Model<ClassAttributes> implements ClassAttributes {
    id!: string;
    name!: string;
    status!: boolean;

    static associate(models: any) {
      Class.belongsToMany(models.Student, {
        through: "Enrollments",
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
        unique: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
