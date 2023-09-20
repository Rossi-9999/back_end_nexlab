interface Class {
  id: string;
  name: string;
  Students: Student[];
}
interface Student {
  id: string;
  name: string;
  email: string;
  Classes: Class[];
}
interface AuthReponse {
  student: Student;
  accessToken: string;
}
interface SignInInput {
  email: string;
  password: string;
}
interface SignUpInput extends SignInInput {
  name: string;
}
interface UpdateStudentInput {
  id: string;
  email: string;
  name: string;
}
interface UpdateStudentResponse {
  code: number;
  message: string;
  success: boolean;
  data?: Student;
}
interface DeleteStudentResponse {
  code: number;
  message: string;
  success: boolean;
}
interface CreateClassInput {
  name: string;
}
interface ClassReponse {
  code: number;
  message: string;
  success: boolean;
  data?: Class;
}
interface UpdateClassInput {
  id: string;
  name: string;
}
interface UpdateClassReponse {
  code: number;
  message: string;
  success: boolean;
  data?: Class;
}
