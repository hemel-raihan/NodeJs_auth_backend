const express =  require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hemelsite:r3w4DU4hIayHzGZb@cluster0.khxme.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log('connected to the database')
})

const routes = require('./routes/routes')

app = express()
app.use(express.json())

app.use('/api', routes)

app.listen(8003);