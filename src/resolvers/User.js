import getUserId from '../utils/getUserId'
import prisma from '../prisma';

const User = {
    // email(parent, args, {request}, info) {
    //     const userid = getUserId(request, false)

    //     console.log("parent: \n" + JSON.stringify(parent))

    //     if(userid && userid === parent.id) {
    //         return parent.email
    //     }else{
    //         return null
    //     }
    // }

    // limit email to show only to login user
    email: {
        fragment: `... based on User {id}`,
        resolve (parent, args, {request}, info) {
            const userid = getUserId(request, false)
        
            if(userid && userid === parent.id) {
                return parent.email
            }else {
                return null
            }
        }
    },

    // limit posts to show only published = true
    posts:{
        fragment: '... based on User {id}',
        resolve (parent, args, {request}, info) {
            return prisma.query.posts({
                where: {
                    published:true,
                    author: {
                        id: parent.id
                    }
                }
            })
        }
    }
}

export {User as default}