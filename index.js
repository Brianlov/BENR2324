const express=require('express')
const app = express()
const port=precess.env.PORT||8080;

app.use(express.json())

app.getMaxListeners('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log('Example app listening on port ${port}')
})


