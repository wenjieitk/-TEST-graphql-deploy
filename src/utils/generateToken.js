import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign(
        {
            userId
        },
        'mysecret',
        {
            expiresIn: '1day' //'default is seconds {1h, 7days, 1second}'
        }
    )
}

export { generateToken as default}