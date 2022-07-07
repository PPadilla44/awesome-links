// import { makeSchema } from "nexus";
// import { join } from "path";

// export const schema = makeSchema({
//   types:[],
//   outputs: {
//     typegen: join(
//       process
//     )
//   }
// })

import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Link {
    id: String
    title: String
    description: String
    url: String
    category: String
    imageUrl: String
    users: [String]
  }

  type Query {
    links: [Link]!
  }
`;
