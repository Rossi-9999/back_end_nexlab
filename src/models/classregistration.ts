"use strict";

import { Model } from "sequelize";

interface ClassRegistrationAttributes {
  StudentId: string;
  ClassId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ClassRegistration
    extends Model<ClassRegistrationAttributes>
    implements ClassRegistrationAttributes
  {
    StudentId!: string;
    ClassId!: string;

    static associate(models: any) {}
  }

  ClassRegistration.init(
    {
      StudentId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Students",
          key: "id",
        },
      },
      ClassId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Classes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ClassRegistration",
    }
  );
  return ClassRegistration;
};
