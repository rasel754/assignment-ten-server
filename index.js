const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2zt49zv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    const craftCollection = client.db('craftDB').collection('craft');

    app.post('/allArtAndCraft', async (req, res) => {
      const newCraft = req.body;
      console.log(newCraft);
      const result = await craftCollection.insertOne(newCraft);
      res.send(result);
  })

  app.get('/myProduct/:email',async (req , res) => {
    console.log(req.params);
    const result = await craftCollection.find({email: req.params.email}).toArray();
    res.send(result);
  })

  app.get('/allArtAndCraft',async (req , res) => {
    const cursor =  craftCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  })

  app.delete('/myArtAndCraft/:id', async(req, res) => {
     const id = req.params.id;
    const query ={_id: new ObjectId (id)};
    const result = await craftCollection.deleteOne(query);
    res.send(result);
  });
  
  app.get('/allArtAndCraft/:id',async (req, res) => {
    const id = req.params.id;
    const query ={_id: new ObjectId (id)};
    const result = await craftCollection.findOne(query);
    res.send(result);
  });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('assignment ten is running');
});

app.listen(port, () => {
  console.log(`assignment ten Server running on port ${port}`);
});
