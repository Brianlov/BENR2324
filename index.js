const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const food=require('./food.js');
var jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

app.use(express.json())
// app.use('/food',food)

// app.get('/inc',async(req,res)=>{
//   let result=await client.db("items").collection("item").updateOne(
//     {name:{$eq:"Nasi Lemak"}},
//     {
//       $inc:{
//         price:10
//       }
//     }
    
//   )
//   console.log(result)
//   res.send(result)
//   })

//   app.get('/max',async(req,res)=>{
//     let result=await client.db("items").collection("item").updateOne(
//       {name:{$eq:"Teh Tarik"}},
//       {
//         $max:{
//           quantity:100
//         }
//       }
      
//     )
//     console.log(result)
//     res.send(result)
//     })
// app.get('/min',async(req,res)=>{
//   let result=await client.db("items").collection("item").updateOne(
//     {name:{$eq:"Teh Tarik"}},
//     {
//       $min:{
//         quantity:0
//       }
//     }
    
//   )
//   console.log(result)
//   res.send(result)
//   })

//   app.get('/push',async(req,res)=>{
//     let result=await client.db("items").collection("item").updateOne(
//       {name:{$eq:"Teh Tarik"}},
//       {$push:{ingredients:{type:"kacang",amount:20}}})
//     console.log(result)
//     res.send(result)
//     })

//'/'define the endpoint;req=request;res=response
app.get('/hello', async (req, res) => {
  res.send('Hello world !')
})
app.get('/', (req, res) => {
  res.send('Kaki Saigoo!')
})
//new user registration
app.post('/users', async (req, res) => {
  let NotNew = await client.db("registers").collection("users").findOne({ username: req.body.username });
  if (NotNew) {
    res.status(404).send("Username already exists");
  }
  else {
    const hash = bcrypt.hashSync(req.body.password, 10);
    //insertOne()=insert a single document into a collection
    let result = await client.db("registers").collection("users").insertOne(
      {
        username: req.body.username,
        email: req.body.email,
        password: hash

      })
    console.log(req.body);
    res.send(result);
  }

})
//login
app.post('/login', async (req, res) => {
  //step 1 req.body.username ??
  //ensure no empty for username and password
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("Please enter both username and password");
  }
  else if (req.body.username != null && req.body.password != null) {

    //step 2
    let user = await client.db("registers").collection("users").findOne({ username: req.body.username });
    if (user)//step 3
    {
      //user found,check whether password is correct
      console.log(user);//found in database
      if (bcrypt.compareSync(req.body.password, user.password)==true) {
        //password is correct
        // res.status(200).send({
        //   message: "Welcome " + user.username,
        //   username: user.username,
        //   password: user.password,
        // });
                        //generate argument passkey
        var token = jwt.sign({ _id: user._id, name:user.username}, 'nogizaka46password',{expiresIn:60});

        res.send(token)
      } // true
      else {
        res.status(409).send("Password is incorrect");
        console.log("Password is incorrect");
        //password is incorrect
      }//false
    }
    else { //user not found
      res.status(404).send("User not found");
      console.log("User not found");
    }
  }
  });

  app.get('/user/:id',async(req,res)=>{
    let auth=req.headers.authorization
    console.log(auth)
    let authSplitted=auth.split(' ')
    console.log(authSplitted)
    let token=authSplitted[1]
    console.log(token)
    let decoded=jwt.verify(token,'nogizaka46password')
    console.log(decoded)
    //let token=(req.header.authorization.split('')[1])
    let user = await client.db("registers").collection("users").findOne({ _id: new ObjectId(req.params.id) });
    res.send(user);
  })

  app.get('/food', async (req, res) => {
    let food = await client.db("Nogizaka46").collection("food").find().toArray()
    res.send(food);
    console.log(food);
  })

app.delete('/users', async (req, res) => {
  console.log(req.body)
  res.send('Hello ' + req.body.name)
})
app.patch('/users', async (req, res) => {
  console.log(req.body)
  res.send('Hello ' + req.body.name)
})



app.get('/memberss', async (req, res) => {
  let members = await client.db("Nogizaka46").collection("member").find().toArray()
  res.send(members)
  console.log(members)
})

// app.post('/hello', (req, res) =>{

// })*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://brian_nogizaka:20010808@cluster2.pwcr3rq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2";

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
    // let delete_acc = await client.db("Nogizaka46").collection("member").deleteOne(
    //   {
    //     _id: new ObjectId(" ")
    //   }
    // )
    //console.log(delete_acc)
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

