import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost'
import prisma from '../src/prisma'
import bcrypt from 'bcryptjs';

const client = new ApolloBoost ({
    uri: 'http://localhost:4000'
})

beforeEach(async () => {
    //extend jest timeOut
    jest.setTimeout(10000)
    // delete all the posts before each test
    await prisma.mutation.deleteManyPosts()
    // delete all the users before each test
    await prisma.mutation.deleteManyUsers()
    // create a user before each test
    const user = await prisma.mutation.createUser({
        data: {
            name: "From Test",
            email: "FromTest@gmail.com",
            password: bcrypt.hashSync('123123123',10)
        }
    })
    // create a post before each test
    await prisma.mutation.createPost({
        data: {
            title: `Test post`,
            body: `testing body`,
            published: true,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
    await prisma.mutation.createPost({
        data: {
            title: `Test post 2`,
            body: `testing body 2`,
            published: false,
            author: {
                connect: {
                    id: user.id 
                }
            }
        }
    })
})

test('should create a new user', async() => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "from Test 1",
                    email: "fromTest1@gmail.com",
                    password: "123123123"
                }
            ){
                token,
                user{
                    id
                    name
                    email
                }
            }
        }
    `

    const response = await client.mutate({
        mutation: createUser
    })

    const exists = await prisma.exists.User({
        id: response.data.createUser.user.id
    })
    expect(exists).toBe(true)
});

test('should expose public author profiles',async () => {
    const getUsers = gql `
        query {
            users {
                id
                name
                email
            }
        }
    `
    const response = await client.query({
        query: getUsers
    })

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('From Test')
});

test('should expose published posts', async () => {
    const getPosts = gql `
        query {
            posts {
                id
                title
                body
                published
            }
        }
    `

    const response = await client.query({
        query: getPosts
    })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)

});