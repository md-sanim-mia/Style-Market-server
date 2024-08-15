const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send('Style-Market server is runing');
});

const uri = `mongodb+srv://${process.env.DB_NAME_KEY}:${process.env.DB_PASS_KEY}@cluster0.mqe77mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db('Style-Market');
    const userCollection = database.collection('Users');
    // await client.db('admin').command({ ping: 1 });
    app.post('/sign-user', async (req, res) => {
      const usrInfo = req.body;
      const qurey = { email: usrInfo.email };
      const isExist = await userCollection.findOne(qurey);
      if (!isExist) {
        const result = await userCollection.insertOne();
        res.send(result);
      } else {
        return res.send({ message: 'user alredy exist' });
      }
    });
    app.post('/google-sign', async (req, res) => {
      const usrInfo = req.body;
      const qurey = { email: usrInfo.email };
      const isExist = await userCollection.findOne(qurey);
      if (!isExist) {
        const result = await userCollection.insertOne();
        res.send(result);
      } else {
        return res.send({ message: 'user alredy exist' });
      }
    });

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Style-Market server port is ${port}`);
});