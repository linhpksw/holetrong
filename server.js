// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./databases/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

let familiesCollection;

// Start the server only after the database connection is established
connectToMongoDB()
    .then((collection) => {
        familiesCollection = collection;

        app.get('/nodes', async (req, res) => {
            const nodes = await familiesCollection.find({}).toArray();
            res.send(nodes);
        });

        app.post('/nodes/add', async (req, res) => {
            const node = req.body;

            try {
                // Find the current highest orderId
                const highestOrderNode = await familiesCollection.find().sort({ orderId: -1 }).limit(1).toArray();
                const highestOrderId = highestOrderNode.length > 0 ? parseInt(highestOrderNode[0].orderId) : 0;

                // Set the orderId for the new node
                node.orderId = highestOrderId + 1;

                // Insert the new node with the incremented orderId
                const result = await familiesCollection.insertOne(node);
                res.send({ status: 'Added', result });
            } catch (error) {
                console.error('Error adding nodes:', error);
                res.status(500).send({ status: 'Error', message: error.message });
            }
        });

        app.put('/nodes/update/:id', async (req, res) => {
            const { id } = req.params;
            const node = req.body;

            // Remove the _id field from the update object
            delete node._id;
            delete node.orderId;

            try {
                await familiesCollection.updateOne({ id: id }, { $set: node });
                res.send({ status: 'Updated', node });
            } catch (error) {
                console.error('Error updating node:', error);
                res.status(500).send({ status: 'Error', message: error.message });
            }
        });

        app.delete('/nodes/delete/:id', async (req, res) => {
            const { id } = req.params;

            try {
                await deleteNodeAndDescendants(familiesCollection, id);
                res.send({ status: 'Deleted', id });
            } catch (error) {
                console.error('Error deleting node:', error);
                res.status(500).send({ status: 'Error', message: error.message });
            }
        });

        // Serve static files from the 'public' directory
        app.use(express.static('public'));

        app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
    })
    .catch((error) => {
        console.error('Failed to start the server:', error);
    });

async function deleteNodeAndDescendants(familiesCollection, nodeId) {
    // First, find the node itself to get any spouses
    const node = await familiesCollection.findOne({ id: nodeId });

    // Delete the spouses (if any)
    if (node && node.pids) {
        for (const partnerId of node.pids) {
            await familiesCollection.deleteOne({ id: partnerId });
        }
    }

    // Then, find all children of the node to be deleted
    const children = await familiesCollection
        .find({
            $or: [{ mid: nodeId }, { fid: nodeId }],
        })
        .toArray();

    // Recursively delete each child
    for (const child of children) {
        await deleteNodeAndDescendants(familiesCollection, child.id);
    }

    // After all children and spouses are deleted, delete the node itself
    await familiesCollection.deleteOne({ id: nodeId });
}
