const express = require('express')
const app = express();
const { PORT } = require('./config/env');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbInit } = require('./config/initDb');

const authRoute = require('./routes/auth')
const pictureRoute = require('./routes/pictureRoute')

app.use((req, res, next) => {
    console.log(`METHOD: ${req.method} >> PATH: ${req.path}`);
    next();
})

app.use(cors(({origin: ["http://localhost:3000"], credentials: true})))
app.use(express.json())
app.use(cookieParser());


app.use('/api/auth', authRoute)
app.use('/api/pictures', pictureRoute)

dbInit()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
