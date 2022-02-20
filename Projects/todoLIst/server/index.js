const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let tasks = [
    {title: "wash car", priority: "high", date:"08/14/21"},
    {title: "wash self", priority: "low", date:"0/14/21"}
]



app.get('/tasks',(req,res)=> {
    let tasks = [
        {title: "wash car", priority: "high", date:"08/14/21"},
        {title: "wash self", priority: "low", date:"0/14/21"}
    ]
    res.json(tasks)
})

app.listen(3000,() =>{
    console.log("server is running")
})