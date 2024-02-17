const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://linhpksw:Bmcmc20@holetrong.fvkbw4i.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const dbName = 'familyDB'; // Replace with your database name

const client = new MongoClient(url);

async function connect() {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const familiesCollection = db.collection('families');
    return { db, familiesCollection };
}

module.exports = { connect };
