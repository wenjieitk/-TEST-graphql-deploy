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

const seedDatabase = async () => {
    //extend jest timeOut
    jest.setTimeout(10000)

    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({
        userId: userOne.user.id
    },process.env.JWT_SECRET)

    // create post 1
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
    // create post 2
    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
}

export{
    seedDatabase as default,
    userOne,
    postOne,
    postTwo
}