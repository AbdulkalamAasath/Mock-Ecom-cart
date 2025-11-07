const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const UserRoute = require('./Routes/UserRoute')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/user',UserRoute)

app.use((req, res, next) => {
    console.log(req.path, req.method,req.body)
    next()
  })
  PORT = 4000
mongoose.connect("mongodb://localhost:27017/E-Com-Nexora")
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
      console.log('listening for requests on port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
