import getUserId from "../utils/getUserId";

const Subscription = {
    comment: {
        subscribe(parent, { postId }, {prisma}, info) {
            // return prisma.subscription.comment(null, info);
            return prisma.subscription.comment({
                where:{
                    node:{
                        post:{
                            id:postId
                        }
                    }
                }
            }, info);
        }
    },

    post: {
        subscribe(parent, { published }, {prisma}, info) {
            // return prisma.subscription.post(null, info);
            return prisma.subscription.post({
                where:{
                    node:{
                        published:true
                    }
                }
            }, info);
        }
    },

    myPost: {
        subscribe(parent, { published }, {prisma, request}, info) {
            const userId =  getUserId(request);

            return prisma.subscription.post({
                where: {
                    node: {
                        author: {
                            id: userId
                        }
                    }
                }
            }, info)
        }
    }
}

export {Subscription as default}