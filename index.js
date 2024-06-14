const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = 3000;

// app.use(cors());
app.use(express.json());

const userName = process.env.USER_NAME;
const key = process.env.SECRET_KEY;

const uri = `mongodb+srv://${userName}:${key}@cluster0.b2ffwwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("products");
    const productCollection = database.collection("products");
    console.log("first");
    // product routes
    // get all foods
    app.get("/products", async (req, res) => {
      try {
        const foods = await productCollection.find().toArray();
        res.send(foods);
      } catch (error) {
        console.error("Error occurred while get food:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    // get single product
    // app.get("", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     console.log(id);
    //     const food = await productCollection.findOne({ _id: new ObjectId(id) });
    //     res.send(food);
    //   } catch (error) {
    //     console.error("Error occurred while get food:", error);
    //     res.status(500).json({ error: "Internal Server Error" });
    //   }
    // });
    // console.log("connected");

    // post product
    // app.post("", async (req, res) => {
    //   try {
    //     const data = req.body;
    //     const result = await foodCollection.insertOne(data);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error occurred while inserting food:", error);
    //     res.status(500).json({ error: "Internal Server Error" });
    //   }
    // });

    // // update update
    // app.patch(" ", async (req, res) => {
    //   const id = req.params.id;
    //   const data = req.body;
    //   const result = await foodCollection.updateOne(
    //     { _id: new ObjectId(id) },
    //     { $set: data },
    //     { upsert: true }
    //   );
    //   res.send(result);
    // });

    // // delete product
    // app.delete("", async (req, res) => {
    //   const id = req.params.id;
    //   const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });
    //   res.send(result);
    // });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`listening from port: ${port}`);
});
