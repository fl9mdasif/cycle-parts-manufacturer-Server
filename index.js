const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// DB_USER=cycle_admin
// DB_PASS=vuR550zUZSMZliQc

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b55ed.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri)

async function run() {
    try {
        await client.connect();
        // console.log('database connected')

        const productsCollection = client.db('cycle_parts').collection('products');
        const usersCollection = client.db('cycle_parts').collection('users');
        const reviewsCollection = client.db('cycle_parts').collection('reviews');
        const userProfileCollection = client.db('cycle_parts').collection('usersprofile');

        //get all products from database
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        //get single product information using ID
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singleProduct = await productsCollection.findOne(query);
            res.send(singleProduct);
        });

        //post user purchase data
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        });

        //get all products from database
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        // get user order data
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singleProduct = await usersCollection.findOne(query);
            res.send(singleProduct);
        });

        //delete product
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });

        //post user myprofile data
        app.post('/usersprofile', async (req, res) => {
            const newUser = req.body;
            const result = await userProfileCollection.insertOne(newUser);
            res.send(result);
        });

        //post user  review
        app.post('/reviews', async (req, res) => {
            const newReview = req.body;
            const result = await reviewsCollection.insertOne(newReview);
            res.send(result);
        });


        //get all reviews from database
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewsCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        // post products to database
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await productsCollection.insertOne(newProduct);
            res.send(result);
        });


    }
    finally {


    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Cycle parts')
})

app.listen(port, () => {
    console.log(`listening to Cycle parts  ${port}`)
})