const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { admin, room, user } = require('./db.js')
const cors = require('cors')

app.use(cors());

const port = process.env.PORT || 5000

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))


app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.send('Hello this is room booking services')

})



app.post('/addadmin', async (req, res) => {


    let { name, number, password } = req.body

    try {
        const existingUser = await admin.findOne({ name: name }).exec();

        if (!existingUser) {
            await admin.create({
                name: name,
                mobileNumber: number,
                password: password,
            });

            res.status(200).json({ message: 'Success' });
        } else {
            res.status(409).json({ message: 'User already exists' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.post('/getadmin', async (req, res) => {
    const { name, password } = req.body;

    try {
        const Admin = await admin.findOne({ name: name }).exec();

        if (Admin && Admin.password === password) {
            res.json({ "auth": true });
        } else {
            res.send({ "auth": false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/adduser', async (req, res) => {

    const { name, number, password } = req.body;

    try {
        const existingUser = await user.findOne({ name: name }).exec();

        if (!existingUser) {
            await user.create({
                name: name,
                mobileNumber: number,
                password: password,
            });

            res.status(200).json({ message: 'Success' });
        } else {
            res.status(409).json({ message: 'User already exists' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})



app.post('/getuser', async (req, res) => {

    const { name, password } = req.body;


    try {
        const User = await user.findOne({ name: name }).exec();
        console.log();

        if (User && User.password === password) {
            res.json({ "auth": true });
        } else {
            res.send({ "auth": false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/addroom', async (req, res) => {

    try {
        let { adminName, roomName, minDay, maxDay, rent, bed, photo } = req.body

        try {
            await room.create(
                {
                    name: adminName,
                    roomname: roomName,
                    minDay: minDay,
                    maxDay: maxDay,
                    rent: rent,
                    bed: bed,
                    photo: photo,
                    booked: false
                }
            );
        }

        catch (err) {
            res.status(500).json(err)
        }

        res.status(200).json({ message: 'Successs' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }


})

app.post('/getadminroom', async (req, res) => {

    let { adminName } = req.body

    const query = { adminname: adminName }

    try {
        var ans = await room.find(query).exec()
    }
    catch (err) {
        console.log(err.message);
    }

    res.json(ans)

})

app.get('/getroom', async (req, res) => {

    try {
        var ans = await room.find().exec()
    }
    catch (err) {
        res.json(err.message)
    }
    // console.log(ans)
    res.send(ans)

})

app.post('/deleteroom', async (req, res) => {
    const { roomname } = req.body;

    try {
        // Logic to delete room from the database
        const deletedRoom = await room.findOneAndDelete({ roomname: roomname });

        if (!deletedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/updateroom', async (req, res) => {

    const { roomname, adminname, ...roomData } = req.body;



    try {
        const updatedRoom = await room.findOneAndUpdate({ roomname, adminname }, roomData, { upsert: true });

        if (updatedRoom) {
            return res.status(200).json({ message: 'updated successfully' });
        }

        res.json(updatedRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/bookroom', async (req, res) => {
    try {
        const { roomName, user, type } = req.body;


        const Room = await room.findOne({ roomname: roomName });


        if (!Room) {
            return res.status(404).json({ message: 'Room not found' });
        }


        if (type === 'book') {
            Room.booked = true;
            Room.bookedby = user; // Replace 'user' with the actual user identifier
            res.status(200).json({ message: 'Room booked successfully' });
        }
        else {
            Room.booked = false
            Room.bookedby = null
            res.status(200).json({ message: 'Room vacated successfully' });
        }

        await Room.save();

        // Return success message
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})