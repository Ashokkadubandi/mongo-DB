const express = require('express')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const mongoose = require('mongoose')
const {DB_USER,DB_PASSWORD} = process.env
const PORT = process.env.PORT || 4000
const {data} = require('./product-data')

app.use(cors())
// console.log(data)

// const productData = [{name:'Mouse',price:2599},{name:'Iphone 15',price:112805}]

const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cltye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbUrl).then(function(connection){
    console.log('connection successfull')
})
const productSchemaRules = {
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    }
}

const userSchema = new mongoose.Schema(productSchemaRules)
//this user userSchema will have queries or syntax
const productModel = mongoose.model('ProductsModel',userSchema)

app.post('/insert', async (req,res) => {
    // res.send('api successfully created')
    const ins = await productModel.insertMany(data)
    res.status(200).json({
        message:'Successfully Added the data'
    })

})

app.get('/data',async (req,res) => {
    const products = await productModel.find()
    res.status(200).json({
        message:'Successfully data retrived',
        products,
    })
})

app.listen(PORT,() => {
    console.log(`https://localhost:${PORT}/`)
})