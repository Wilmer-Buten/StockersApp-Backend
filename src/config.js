
export default {

    MONGO_DATABASE: process.env.MONGO_DATABASE || 'books-gestion',
    MONGO_USER: 'admin', 
    MONGO_PASSWORD: 'password',
    MONGO_HOST: '127.0.0.1',
    SECRET: 'JWT_SECRET_PASSWORD'
}