import 'cross-fetch/polyfill'
import {gql} from 'apollo-boost'
import seedDatabase,{userOne} from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

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

test('should fetch user posts with user authenticated', async () => {
    // if not getClient(userOne.jwt), then will use public client
    const client = getClient(userOne.jwt)
    const myPosts = gql `
        query {
            myPosts {
                id
                title
                body
                published
            }
        }
    `
    const {data} = await client.query({
        query: myPosts
    })

    expect(data.myPosts.length).toBe(2)
});

test('should be alble to update own post',async () => {
    
});