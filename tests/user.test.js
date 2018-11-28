import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost'
import prisma from '../src/prisma'

const client = new ApolloBoost ({
    uri: 'http://localhost:4000'
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