"use strict";

import { Model, UUIDV4 } from "sequelize";

interface StudentAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Student extends Model<StudentAttributes> implements StudentAttributes {
    id!: string;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      Student.belongsToMany(models.Class, {
        through: "ClassRegistrations",
      });
    }
  }
  Student.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
