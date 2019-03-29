import { importSchema } from "graphql-import";
import path from "path";

const resolvers = {
  Query: {
    posts: (
      _: any,
      args: { searchString: any },
      context: {
        prisma: {
          query: {
            posts: (
              arg0: {
                where: {
                  OR: Array<
                    | { title_contains: any; content_contains?: undefined }
                    | { content_contains: any; title_contains?: undefined }
                  >;
                };
              },
              arg1: any
            ) => void;
          };
        };
      },
      info: any
    ) => {
      return context.prisma.query.posts(
        {
          where: {
            OR: [
              { title_contains: args.searchString },
              { content_contains: args.searchString }
            ]
          }
        },
        info
      );
    },
    user: (
      _: any,
      args: { id: any },
      context: {
        prisma: {
          query: { user: (arg0: { where: { id: any } }, arg1: any) => void };
        };
      },
      info: any
    ) => {
      return context.prisma.query.user(
        {
          where: {
            id: args.id
          }
        },
        info
      );
    }
  },
  Mutation: {
    createDraft: (
      _: any,
      args: { title: any; content: any; slug: any; authorId: any },
      context: {
        prisma: {
          mutation: {
            createPost: (
              arg0: {
                data: {
                  title: any;
                  content: any;
                  slug: any;
                  author: { connect: { id: any } };
                };
              },
              arg1: any
            ) => void;
          };
        };
      },
      info: any
    ) => {
      return context.prisma.mutation.createPost(
        {
          data: {
            title: args.title,
            content: args.content,
            slug: args.slug,
            author: {
              connect: {
                id: args.authorId
              }
            }
          }
        },
        info
      );
    },
    publish: (
      _: any,
      args: { id: any },
      context: {
        prisma: {
          mutation: {
            updatePost: (
              arg0: { where: { id: any }; data: { published: boolean } },
              arg1: any
            ) => void;
          };
        };
      },
      info: any
    ) => {
      return context.prisma.mutation.updatePost(
        {
          where: {
            id: args.id
          },
          data: {
            published: true
          }
        },
        info
      );
    },
    deletePost: (
      _: any,
      args: { id: any },
      context: {
        prisma: {
          mutation: {
            deletePost: (arg0: { where: { id: any } }, arg1: any) => void;
          };
        };
      },
      info: any
    ) => {
      return context.prisma.mutation.deletePost(
        {
          where: {
            id: args.id
          }
        },
        info
      );
    },
    signup: (
      _: any,
      args: { name: any },
      context: {
        prisma: {
          mutation: {
            createUser: (arg0: { data: { name: any } }, arg1: any) => void;
          };
        };
      },
      info: any
    ) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            name: args.name
          }
        },
        info
      );
    }
  }
};

const typeDefs = importSchema(path.resolve("./schema.graphql"));

export { typeDefs, resolvers };
