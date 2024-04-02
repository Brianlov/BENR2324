const express=require('express')
const app = express()
const port=process.env.PORT||3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world !')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://b022210122:nogizakabrian@benr2423brian1.xdst3gl.mongodb.net/?retryWrites=true&w=majority&appName=benr2423Brian1";

// Create a MongoClient,communicate with mongodb with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
   /*let result=await client.db("Nogizaka46").collection("member").insertOne({
      name:"Himura Yuuki",
      age:24,
      generation:"3rd"
    })
    console.log(result)*/
    /*let member=await client.db("Nogizaka46").collection( "member" ).find(
      {
        generation:"4th"
      }
    ).toArray()//find()=for(n=0;n<document.size;n++)act as parameter,toArray()=return the documents
    console.log(member);*/
    /*let member_new=await  client.db("Nogizaka46").collection("member").updateOne(
      {name:"Kaki Haruka"},
      {
      $set:{
        group:"Nogizaka46",

      }
    }
    )
    console.log(member_new)*/
    let delete_acc= await client.db("Nogizaka46").collection("member").deleteOne(
      {
        _id:new ObjectId("660b6d8c10a4acc2f6aa9b0e")
      }
    )
    console.log(delete_acc)
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

