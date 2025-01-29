const { MongoClient } = require("mongodb");

exports.handler = async function(event, context) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("Cluster0");

    const data = await db.collection("e-commerce").find().toArray();
    
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
