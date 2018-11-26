import {GraphQLServer} from 'graphql-yoga';
import prisma from './prisma'
import {resolvers} from './resolvers/index'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            prisma,
            request
        }
    }
});

export {
    server as default
}