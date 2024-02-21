// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./databases/db');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save to 'server/uploads/' directory which is not publicly accessible
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage });

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

                node.imgUrl = node.gender === 'male' ? '/uploads/male.png' : '/uploads/female.png'; // Default avatar URL

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

                // Check if the collection is empty after deletion
                const count = await familiesCollection.countDocuments();
                if (count === 0) {
                    // Collection is empty, so create a base node
                    const baseNode = {
                        gender: 'male',
                        id: '_abc1',
                        orderId: 1,
                        name: 'Lê Trọng Linh',
                        pids: [],
                        birthDate: '',
                        deathDate: '',
                        otherName: '',
                        achivements: '',
                        birthPlace: 'Phúc Sơn, Anh Sơn, Nghệ An.',
                        currentResidence: 'P416B, C16, Thanh Xuân Bắc, Thanh Xuân, Hà Nội.',
                        deathPlace: '',
                        email: 'linhpksw@gmail.com',
                        fbUrl: 'fb.me/linhpksw',
                        homeTown: 'Phúc Sơn, Anh Sơn, Nghệ An.',
                        lunarBirthDate: '',
                        lunarDeathDate: '',
                        moreInfo: '',
                        phone: '0375830815',
                        solarBirthDate: '',
                        solarDeathDate: '',
                        imgUrl: '/uploads/male.png',
                    };
                    await familiesCollection.insertOne(baseNode);
                }

                res.send({ status: 'Deleted', id });
            } catch (error) {
                console.error('Error deleting node:', error);
                res.status(500).send({ status: 'Error', message: error.message });
            }
        });

        // Serve static files from the 'public' directory
        app.use(express.static('public'));

        // Upload route
        app.post('/upload', upload.single('file'), async (req, res) => {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }

            const nodeId = req.body.nodeId;
            const tempPath = req.file.path;
            const newFilename = `ava_${nodeId}.jpeg`;
            const newPath = path.join('uploads', newFilename);

            try {
                // Process and save the new image
                await sharp(tempPath).rotate().resize(256, 256).toFormat('jpeg').jpeg({ quality: 95 }).toFile(newPath);

                // Update the node's avatar URL in the database
                const newImageUrl = `/uploads/${newFilename}`;

                await familiesCollection.updateOne({ id: nodeId }, { $set: { imgUrl: newImageUrl } });

                res.send({ status: 'Avatar uploaded and node updated!', avatarUrl: newImageUrl });
            } catch (error) {
                console.error('Error during image upload and update:', error);
                res.status(500).send({ status: 'Error', message: 'Failed to upload and update avatar.' });
            }
        });

        // Route to serve images securely
        app.get('/uploads/:filename', (req, res) => {
            const filename = req.params.filename;
            const filepath = path.resolve('uploads', filename);

            res.sendFile(filepath, (err) => {
                if (err) {
                    res.status(404).send('File not found.');
                }
            });
        });

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
