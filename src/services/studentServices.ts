import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
require("dotenv").config();

var salt = bcrypt.genSaltSync(10);

const hashPassword = (password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const checkEmail = async (email: string) => {
  try {
    let student = await db.Student.findOne({
      where: { email: email },
    });
    if (student) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getStudents = async (): Promise<Student[]> => {
  const studentsData = await db.Student.findAll({
    include: {
      model: db.Class,
      through: {
        attributes: [],
      },
    },
  });

  const students = await studentsData.map((data: Student) => {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      classes: data.Classes,
    };
  });
  return students;
};

export const signUp = async (data: SignUpInput): Promise<AuthReponse> => {
  if (!data.email || !data.password || !data.name) {
    throw new GraphQLError("Missing required parameter!");
  }
  let hash_Password = await hashPassword(data.password);
  let check_email = await checkEmail(data.email);
  if (check_email) {
    throw new GraphQLError("Student has already!");
  } else {
    const newStudent = await db.Student.create({
      name: data.name,
      email: data.email,
      password: hash_Password,
    });
    let secret_key = process.env.JWT_SECRET || "abcxyz";
    const accessToken = jwt.sign({ sub: newStudent.id }, secret_key, {
      expiresIn: "48h",
    });
    return {
      student: newStudent,
      accessToken: accessToken,
    };
  }
};

export const signIn = async (data: SignInInput): Promise<AuthReponse> => {
  if (!data.email || !data.password) {
    throw new GraphQLError("Missing required parameter!");
  }
  let student = await db.Student.findOne({
    where: { email: data.email },
  });

  if (!student) {
    throw new GraphQLError("Email is incorrect!");
  }
  let checkPassword = await bcrypt.compareSync(data.password, student.password);
  if (!checkPassword) throw new GraphQLError("Password is incorrect!");
  let secret_key = process.env.JWT_SECRET || "abcxyz";

  const accessToken = jwt.sign({ sub: student.id }, secret_key, {
    expiresIn: "48h",
  });
  return {
    accessToken,
    student,
  };
};

export const getCurrentStudent = async (token: string): Promise<Student> => {
  if (!token) throw new GraphQLError("Invalid Token!");
  let studentId = "";
  let secret_key = process.env.JWT_SECRET || "abcxyz";

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) throw new GraphQLError(err.message);
    if (typeof decoded !== "string") {
      studentId = decoded?.sub as string;
    }
  });
  const student = await db.Student.findByPk(studentId);
  if (!student) throw new GraphQLError("Student not found!");
  return student;
};

export const updateStudent = async (
  data: UpdateStudentInput
): Promise<UpdateStudentResponse> => {
  if (!data.id) {
    return {
      code: 1,
      message: "Missing required parameter id",
      success: false,
    };
  } else {
    let student = await db.Student.findOne({
      where: { id: data.id },
    });

    if (student) {
      try {
        student.name = data.name;
        student.email = data.email;
        await student.save();

        return {
          code: 0,
          message: "Update successfully",
          success: true,
          data: student,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 3,
          message: "Update failed",
          success: false,
        };
      }
    } else {
      return {
        code: 2,
        message: "student not found",
        success: false,
      };
    }
  }
};

export const deleteStudent = async (
  id: string
): Promise<DeleteStudentResponse> => {
  if (!id) {
    return {
      code: 1,
      message: "Missing required parameter id",
      success: false,
    };
  } else {
    let student = await db.Student.findOne({
      where: { id },
    });

    if (student) {
      try {
        await db.Student.destroy({
          where: { id: id },
        });
        return {
          code: 0,
          message: "Delete successfully",
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 3,
          message: "Can't delete student",
          success: true,
        };
      }
    } else {
      return {
        code: 2,
        message: "Student not found",
        success: false,
      };
    }
  }
};
