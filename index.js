const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });


const url = 'mongodb://localhost:27017';
const dbName = 'eventdb';
let db;


MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  })
  .catch(error => console.error(error));


app.get('/api/v3/app/events', async (req, res) => {
  const { id, type, limit, page } = req.query;
  
  try {
    if (id) {
    
      const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } else if (type === 'latest') {

      const events = await db.collection('events')
        .find()
        .sort({ schedule: -1 })
        .limit(parseInt(limit) || 5)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .toArray();
      res.status(200).json(events);
    } else {
      res.status(400).json({ error: "Invalid parameters" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/v3/app/events', upload.single('image'), async (req, res) => {
  const { uid, name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, attendees } = req.body;
  
  const event = {
    type: "event",
    uid: parseInt(uid),
    name,
    tagline,
    schedule: new Date(schedule),
    description,
    files: { image: req.file ? req.file.path : null },
    moderator,
    category,
    sub_category,
    rigor_rank: parseInt(rigor_rank),
    attendees: attendees ? attendees.split(',').map(id => parseInt(id)) : []
  };
  
  try {
    const result = await db.collection('events').insertOne(event);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/api/v3/app/events/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { uid, name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, attendees } = req.body;

  const event = {
    type: "event",
    uid: parseInt(uid),
    name,
    tagline,
    schedule: new Date(schedule),
    description,
    files: { image: req.file ? req.file.path : null },
    moderator,
    category,
    sub_category,
    rigor_rank: parseInt(rigor_rank),
    attendees: attendees ? attendees.split(',').map(id => parseInt(id)) : []
  };
  
  try {
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(id) },
      { $set: event }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Event updated" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/api/v3/app/events/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Event deleted" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
