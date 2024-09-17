const express = require('express')
const userRouter = require('../src/routes/routes')
const dotenv=require('dotenv')
const connctDB = require('./config/config')

const swaggerUi=require('swagger-ui-express')
const swaggerDocument=require('./Swagger/swaggerDoc.json')

dotenv.config()

connctDB()

const app = express()

app.use(express.json())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api/users',userRouter)

const PORT=process.env.PORT


app.listen(PORT, () => {
    console.log(`server listening ${PORT}`);
})

