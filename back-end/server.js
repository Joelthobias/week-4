const express = require('express')
const mongoose=require('mongoose')
require('dotenv').config()

const app = express()

const userRouter=require('./routes/user')

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
})
app.use(express.json())
app.use('/api/user',userRouter)



mongoose.connect(process.env.mongoURL)
.then(()=>{
    console.log('\nDatabase connected \n ');
    app.listen(process.env.PORT, () => {
        console.log(`listing in localhost:${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log(err);
})