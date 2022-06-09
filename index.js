const express =  require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
 

mongoose.connect('mongodb+srv://hemelsite:r3w4DU4hIayHzGZb@cluster0.khxme.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log('connected to the database')
})

const userHandler = require('./routes/userHandler')
const todoHandler = require('./routes/todoHandler')

app = express()

dotenv.config()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))

app.use(express.json())

//app.use('/api', routes)
app.use("/api/todo", todoHandler);
app.use("/api/user", userHandler);

app.listen(8000);