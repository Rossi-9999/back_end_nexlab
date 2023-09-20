import db from "../models";
import { GraphQLError } from "graphql";
require("dotenv").config();

export const createClass = async (
  data: CreateClassInput
): Promise<ClassReponse> => {
  if (!data.name) {
    return {
      code: 1,
      message: "Missing required parameters!",
      success: false,
    };
  } else {
    try {
      const newClass = await db.Class.create({
        name: data.name,
      });
      return {
        code: 0,
        message: "Create class successfully",
        success: false,
        data: newClass,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 2,
        message: "Can't create class",
        success: false,
      };
    }
  }
};

export const getClasses = async (): Promise<Class[]> => {
  const classData = await db.Class.findAll({
    include: {
      model: db.Student,
      through: {
        attributes: [],
      },
    },
  });

  const classes = await classData.map((data: Class) => {
    return {
      id: data.id,
      name: data.name,
      students: data.Students,
    };
  });
  return classes;
};

export const updateClassById = async (
  data: UpdateClassInput
): Promise<UpdateClassReponse> => {
  if (!data.name || !data.id) {
    return {
      code: 1,
      message: "Missing required parameters!",
      success: false,
    };
  } else {
    let dataClass = await db.Class.findOne({ where: { id: data.id } });
    if (dataClass) {
      try {
        dataClass.name = data.name;
        await dataClass.save();
        return {
          code: 0,
          message: "Update class successfully",
          success: true,
          data: dataClass,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 2,
          message: "Can't update class",
          success: true,
        };
      }
    } else {
      return {
        code: 3,
        message: "Class isn't exist",
        success: false,
      };
    }
  }
};

export const deleteClassById = async (id: string): Promise<ClassReponse> => {
  if (!id) {
    return {
      code: 1,
      message: "Missing required parameter id",
      success: false,
    };
  } else {
    let dataClass = await db.Class.findOne({ where: { id: id } });
    if (dataClass) {
      try {
        await db.Class.destroy({ where: { id: id } });
        return {
          code: 0,
          message: "Delete class successfully",
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 2,
          message: "Can't delete class",
          success: true,
        };
      }
    } else {
      return {
        code: 3,
        message: "Class isn't exist",
        success: false,
      };
    }
  }
};

export const getClassById = async (id: string): Promise<ClassReponse> => {
  if (!id) {
    return {
      code: 1,
      message: "Missing required parameter id",
      success: false,
    };
  } else {
    try {
      let classData = await db.Class.findByPk(id);

      return {
        code: 0,
        message: "Get class successfully",
        success: true,
        data: classData,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 2,
        message: "Class isn't exist",
        success: true,
      };
    }
  }
};
