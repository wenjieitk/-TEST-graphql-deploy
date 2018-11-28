import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'


const seedDatabase = async () => {
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
}

export{
    seedDatabase as default
}