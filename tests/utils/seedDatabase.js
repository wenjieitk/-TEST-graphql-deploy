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

    await prisma.mutation.createPost({
        data: {
            title: `Test post`,
            body: `testing body`,
            published: true,
            author: {
                connect: {
                    id: userOne.user.id
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
                    id: userOne.user.id 
                }
            }
        }
    })
}

export{
    seedDatabase as default,
    userOne
}