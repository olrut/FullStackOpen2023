const { GraphQLError } = require("graphql");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
  type Author {
  name: String!
  born: Int
  bookCount: Int!
  }
    
  type Query {
    me: User
    booksByGenre(genre: String!): [Book!]!
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    booksByFavoriteGenre: [Book!]!
    favoriteGenre: String
  }
  
  type Mutation {
  addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
  editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  createUser(
      username: String!
      favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  }
`;

const resolvers = {
  Query: {
    booksByFavoriteGenre: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const favoriteGenre = currentUser.favoriteGenre;
      return Book.find({
        genres: { $in: [favoriteGenre] },
      }).populate("author");
    },
    favoriteGenre: (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      return currentUser.favoriteGenre;
    },
    booksByGenre: async (root, args) => {
      const { genre } = args;
      if (!genre || genre === "all genres") {
        return Book.find({}).populate("author");
      }
      return Book.find({ genres: { $in: [args.genre] } }).populate("author");
    },
    allGenres: async () => {
      const genres = await Book.find({}).distinct("genres");
      return genres;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        if (!args.author && !args.genre) {
          const books = await Book.find({}).populate("author");
          return books;
        }
        if (args.author && !args.genre) {
          return Book.find({ author: args.author }).populate("author");
        }
        if (!args.author && args.genre) {
          return Book.find({ genres: { $in: [args.genre] } }).populate(
            "author",
          );
        }
        if (args.author && args.genre) {
          return Book.find({
            author: args.author,
            genres: { $in: [args.genre] },
          }).populate("author");
        }
      } catch (error) {
        throw new GraphQLError("Fetching books failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      try {
        return await Book.countDocuments({ author: root._id });
      } catch (error) {
        throw new GraphQLError("Counting books failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: root,
            error,
          },
        });
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        // If the author does not exist, add it to the list of authors
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          author = newAuthor;
        }
        const book = new Book({ ...args, author: author._id });
        await book.save();
        return book;
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true, runValidators: true },
        );
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET,
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
