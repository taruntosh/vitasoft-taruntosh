const express = require('express')
const connectDB = require('./config/db')

const app = express();
connectDB()

//middleware
app.use(express.json({extended: false}))

app.use('/user', require('./routes/api/users'))
app.use('/login', require('./routes/api/login'))
app.use('/form', require('./routes/api/forms'))


const PORT = 5000

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))