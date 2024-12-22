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
const batterySchemaRules = {
    battery_id:{
        type:String,
        required:true
    },
    current:{
        type:String,
        required:true
    },
    voltage:{
        type:String,
        required:true
    },
    temperature:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        default:Date.now()
    }
}

const batterySchema = new mongoose.Schema(batterySchemaRules)
//this user userSchema will have queries or syntax
const batteryModel = mongoose.model('BatteryModel',batterySchema)

app.post('/insert', async (req,res) => {
    // res.send('api successfully created')
    const {battery_id,current,voltage,temperature,time} = req.body

    const ins = await batteryModel.insertMany(req.body)
    res.status(200).json({
        message:'Successfully Added the data'
    })

})

app.get('/data',async (req,res) => {
    const products = await batteryModel.find()
    res.status(200).json({
        message:'Successfully data retrived',
        products,
    })
})

app.listen(PORT,() => {
    console.log(`https://localhost:${PORT}/`)
})