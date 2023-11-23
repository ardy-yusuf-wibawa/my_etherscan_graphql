// Import Apollo Server and schema import utility
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom data source for Ethereum data
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema from file
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file  
require("dotenv").config();

// Resolvers match schema fields to data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      // Call etherBalanceByAddress method on Ethereum data source
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      // Call totalSupplyOfEther method on Ethereum data source  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      // Call getLatestEthereumPrice method on Ethereum data source
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      // Call getBlockConfirmationTime method on Ethereum data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Pass Ethereum data source to context  
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set no timeout limit
server.timeout = 0;

// Start Apollo Server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
