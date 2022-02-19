const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs')

const socks = 
    {
      id: 1
    };
const sharpenedStick = 
    {
      id: 2,
      name: 'Sharpened Stick',
      description: 'A stick, but sharper',
    };

const products = [socks, sharpenedStick];

const buyer = {
  firstName: "Emptor",
  lastName: "Caveat",
  title: "Mr."
};

const orders = [
   {
     id: "ORDER-0001",
    products: [socks],
    buyer
   }
]
const resolvers = {
    Query: {
      products: () => products,
      order: (parent, args) => {
        return orders.find(order => (order.id === args.id));
      },
      orders: () => orders,
      customers: () => [buyer]
    },
  };

const typeDefs = readFileSync('./schema.gql').toString('utf-8')

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});