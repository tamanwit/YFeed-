const mongoose = require('mongoose')
const {Schema} = mongoose
require('dotenv').config()


mongoose.connect(process.env.MONGO)
    .then(()=>console.log('DB Connected'))
    .catch((err)=>console.log(err))

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    phone: {
        type: Number
    },

    bio: {
        type: String
    },

    followers: [
        // ids to be stored
    ],

    followings: [
        // ids to be stored
    ],

    posts: [
        // ids to be stored
    ],

    stories: [
        // ids to be stored
    ],

    reels: [
        // ids to be stored
    ],

    profileImage: {
        type: String
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User