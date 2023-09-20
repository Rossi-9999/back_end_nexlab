import studentResolvers from "./student";
import classResolvers from "./class";
export const resolvers = {
  Query: {
    ...studentResolvers.Query,
    ...classResolvers.Query,
  },
  Mutation: {
    ...studentResolvers.Mutation,
    ...classResolvers.Mutation,
  },
};
