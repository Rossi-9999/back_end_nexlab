export const typeDefs = /* GraphQL */ `
  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }
  input UpdateStudentInput {
    id: String!
    email: String!
    name: String!
  }
  input CreateClassInput {
    name: String!
  }
  input UpdateClassInput {
    id: String!
    name: String!
  }
  type Student {
    id: String
    name: String
    email: String
    password: String
    classes: [Class]
  }
  type Class {
    id: String
    name: String
    students: [Student]
  }
  type AuthReponse {
    student: Student!
    accessToken: String!
  }
  type DeleteStudentResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type UpdateStudentResponse {
    code: Int!
    success: Boolean!
    message: String!
    data: Student
  }
  type ClassReponse {
    code: Int!
    message: String!
    success: Boolean!
    data: Class
  }

  type Query {
    students: [Student]!
    getMe: Student!
    classes: [Class]!
    class(id: ID!): ClassReponse!
  }
  type Mutation {
    signUp(data: SignUpInput!): AuthReponse
    signIn(data: SignInInput!): AuthReponse
    updateStudentById(data: UpdateStudentInput!): UpdateStudentResponse
    deleteStudentById(id: ID!): DeleteStudentResponse
    createClass(data: CreateClassInput!): ClassReponse
    updateClassById(data: UpdateClassInput!): ClassReponse
    deleteClassById(id: ID!): ClassReponse
  }
`;
