import { YogaInitialContext } from "graphql-yoga";
import {
  createClass,
  getClasses,
  updateClassById,
  deleteClassById,
  getClassById,
} from "../../services/classServives";

const studentResolvers = {
  Query: {
    classes: async () => getClasses(),
    class: async (_: any, args: { id: string }) => getClassById(args.id),
  },
  Mutation: {
    createClass: async (_: any, args: { data: CreateClassInput }) =>
      createClass(args.data),
    updateClassById: async (_: any, args: { data: UpdateClassInput }) =>
      updateClassById(args.data),
    deleteClassById: async (_: any, args: { id: string }) =>
      deleteClassById(args.id),
  },
};
export default studentResolvers;
