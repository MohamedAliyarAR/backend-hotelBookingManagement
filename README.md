# Booking.com

A simple Hotel Booking Management web application built using MERN stack

## Table of Contents

- [Installation](#installation)
- [Set up](#set-up)
- [Data Base](#database)
- [Usage](#usage)

## Installation

1. Assuming you have installed npm and nodejs
2. Clone the Front-end code

```bash
gh repo clone MohamedAliyarAR/frontend-hotelBookingManagement
```
2. Clone the Back-end code

```bash
gh repo clone MohamedAliyarAR/backend-hotelBookingManagement
```


3. Install MongoDB Compass.

## Set up

- run <code>npm install</code> in both directory.
- to start the front-end run <code>npm run start</code>
- to start the back-end run <code>node app.js</code>
- Env var are <code>DBUSERNAME=your db name</code> <code>DBPASSWORD=your db password if any </code>

## Database
- The schema is located in db.js file
- Create a new db and add it in the env var <code>DDBUSERNAME=your db name</code>
- If there is no db password remove the var <code>password</code>


## Usage 
### Admin
- Admin has to register as Admin
- Admin can add room and manipulate the room created by the respective admin
- A simple understanding interface is provided.

### User
- Use has to register as user
- User can book room and vacate the room.
- The datails of the user is shared to the admin.
- The user can view images of the room.
