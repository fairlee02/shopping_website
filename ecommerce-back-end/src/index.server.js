const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

//routes

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/admin/authAdminRoutes')
const categoryRoutes= require('./routes/categoryRoutes')
const productRoutes= require('./routes/productRoutes')

//environment variable
env.config();

//mongoDB-connection
//mongodb+srv://<username>:<password>@cluster0.zv22h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.duixl.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser:true, 
        useUnifiedTopology: true,
        // useCreateIndex: true
    }
).then(()=> {
     console.log('Database Connected')
});



app.use(express.json());

app.use('/api', adminRoutes);
app.use('/api', authRoutes); //as a middleware to prefix all the request
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

//middlewares => when making a request/handling request..manipulating data

//binding
app.listen(process.env.PORT,()=>{
    console.log(`Server is  running on port ${process.env.PORT}`)
});