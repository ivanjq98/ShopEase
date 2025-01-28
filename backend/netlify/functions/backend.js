// netlify/functions/backend.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI; // MongoDB URI as an environment variable
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
  try {
    await client.connect();
    const db = client.db("Cluster0");
    const collection = db.collection("e-commerce");

    const data = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: `Error: ${error.message}` };
  } finally {
    await client.close();
  }
};
