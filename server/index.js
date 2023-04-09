const express = require('express')
const app = express();
const { PORT } = require('./config/env');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbInit } = require('./config/initDb');

const authRoute = require('./routes/auth')
const usersRoute = require('./routes/usersRoute')
const pictureRoute = require('./routes/pictureRoute')
const emailRoute = require('./routes/emailRoute')
const commentRoute = require('./routes/commentRoute')

app.use((req, res, next) => {
    console.log(`METHOD: ${req.method} >> PATH: ${req.path}`);
    next();
})

app.use(cors(({origin: ["http://localhost:3000"], credentials: true})))
app.use(express.json())
app.use(cookieParser());


app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/pictures', pictureRoute)
app.use('/api/email', emailRoute)
app.use('/api/comment', commentRoute)

dbInit()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
