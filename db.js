const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' });

const name = process.env.DBUSERNAME
const password = process.env.DBPASSWORD


const URL = `mongodb+srv://${name}:${password}@cluster0.5un9qux.mongodb.net/room-booking`

mongoose.connect(URL)

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const adminSchema = new mongoose.Schema({
    name: String,
    password: String,
    mobileNumber: Number
})

const roomSchema = new mongoose.Schema({
    adminname: String,
    roomname: String,
    minDay: Number,
    maxDay: Number,
    rent: Number,
    bed: Number,
    photo: String,
    booked: Boolean,
    bookedby: String
})

const userSchema = new mongoose.Schema({
    name: String,
    mobileNumber: Number,
    booking: [{
        roomname: String,
        days: Number
    }],
    password: String

})

const admin = mongoose.model('Admin', adminSchema);
const room = mongoose.model('Room', roomSchema);
const user = mongoose.model('User', userSchema);




module.exports = { admin, user, room }