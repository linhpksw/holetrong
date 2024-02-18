// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./databases/db'); // Make sure this path is correct

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

app.get('/nodes', async (req, res) => {
    const { familiesCollection } = await connect();
    const nodes = await familiesCollection.find({}).toArray();
    res.send(nodes);
});

app.put('/nodes/:id', async (req, res) => {
    const { collection } = await connect();
    const { id } = req.params;
    const node = req.body;
    await collection.updateOne({ id: parseInt(id) }, { $set: node });
    res.send({ status: 'Updated', node });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
