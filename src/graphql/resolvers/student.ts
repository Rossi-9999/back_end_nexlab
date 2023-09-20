import { YogaInitialContext } from "graphql-yoga";
import {
  getStudents,
  signUp,
  updateStudent,
  deleteStudent,
  signIn,
  getCurrentStudent,
} from "../../services/studentServices";

const studentResolvers = {
  Query: {
    students: async () => getStudents(),
    getMe: async (_: any, __: any, context: YogaInitialContext) => {
      try {
        const token = context.request.headers
          .get("authorization")
          ?.split(" ")[1] as string;
        return await getCurrentStudent(token);
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
  Mutation: {
    signUp: async (_: any, args: { data: SignUpInput }) =>
      await signUp(args.data),
    signIn: async (_: any, args: { data: SignInInput }) =>
      await signIn(args.data),
    updateStudentById: async (_: any, arg: { data: UpdateStudentInput }) =>
      await updateStudent(arg.data),
    deleteStudentById: async (_: any, { id }: any) => await deleteStudent(id),
  },
};
export default studentResolvers;
