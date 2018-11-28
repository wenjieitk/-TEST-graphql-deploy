import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'
import jwt from 'jsonwebtoken'

const userOne = {
    input: {
        name: "From Test",
        email: "FromTest@gmail.com",
        password: bcrypt.hashSync('123123123')
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: "From Test 2",
        email: "FromTest2@gmail.com",
        password: bcrypt.hashSync('123123123')
    },
    user: undefined,
    jwt: undefined
}

const postOne = {
    input: {
        title: `Test post`,
        body: `testing body`,
        published: true,
    },
    post: undefined
}

const postTwo = {
    input: {
        title: 'My draft post',
        body: '',
        published: false
    },
    post: undefined
}

const commentOne = {
    input: {
        text: "testing 1"
    },
    comment: undefined
}

const commentTwo = {
    input: {
        text: "testing 2"
    },
    comment: undefined
}

const seedDatabase = async () => {
    //extend jest timeOut
    jest.setTimeout(10000)

    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    //create user
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({
        userId: userOne.user.id
    },process.env.JWT_SECRET)

    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({
        userId: userTwo.user.id
    },process.env.JWT_SECRET)

    // create post
    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })

    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userTwo.user.id
                }
            }
        }
    })

    // create comment
    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    })

    commentTwo.comment = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect: {
                    id: userTwo.user.id
                }
            },
            post: {
                connect: {
                    id: postTwo.post.id
                }
            }
        }
    })
}

export{
    seedDatabase as default,
    userOne,
    userTwo,
    postOne,
    postTwo,
    commentOne,
    commentTwo
}