"use strict";

import { Model } from "sequelize";

interface EnrollmentAttributes {
  id: string;
  StudentId: string;
  ClassId: string;
  status: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Enrollment
    extends Model<EnrollmentAttributes>
    implements EnrollmentAttributes
  {
    id!: string;
    StudentId!: string;
    ClassId!: string;
    status!: boolean;

    static associate(models: any) {}
  }

  Enrollment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      StudentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Students",
          key: "id",
        },
      },
      ClassId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Classes",
          key: "id",
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Enrollment",
    }
  );
  return Enrollment;
};
