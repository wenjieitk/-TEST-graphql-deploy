import 'cross-fetch/polyfill'
import {gql} from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

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

test('should not login with bad credentials', async() => {
    const login = gql`
        mutation {
            login(
                data: {
                    email: "bad@gmail.com",
                    password: "hahahahaha"
                }
            ){
                    token
            }
        }
    `
    await expect(
        client.mutate({
            mutation: login
        })
    )
    .rejects
    .toThrow()
});

test('should not signup user with invalid password', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "from Test 2",
                    email: "fromTest2@gmail.com",
                    password: "123"
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
        await expect(
            client.mutate({
                mutation: createUser
            })
        )
        .rejects
        .toThrow()
});