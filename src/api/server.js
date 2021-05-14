/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const escapeRegExp = require('lodash.escaperegexp');

const expressPort =
  process.env.NODE_ENV === 'development'
    ? process.env.EXPRESS_PORT_DEV
    : process.env.EXPRESS_PORT_PROD;
const app = express();

let db;
let eventsCollection;

app.use(cors());

app.get('/api/eventDescriptions', async (req, res, next) => {
  try {
    const eventShortDescriptions = await eventsCollection.distinct(
      'eventShortDescription'
    );
    res.status(200).json(eventShortDescriptions);
  } catch (error) {
    next(error);
  }
});

app.get('/api/events', async (req, res, next) => {
  const filters = JSON.parse(req.query.filters);
  const sortBy = JSON.parse(req.query.sortBy);

  const query = {};
  if (filters.length > 0) {
    query.$and = [];
    filters.forEach((filter) => {
      query.$and.push({
        [filter.id]: new RegExp(
          `${
            filter.id === 'eventShortDescription'
              ? escapeRegExp(filter.value)
              : escapeRegExp(filter.value).toLowerCase()
          }`
        ),
      });
    });
  }

  try {
    const [count, events] = await Promise.all([
      eventsCollection.countDocuments(query),
      eventsCollection
        .find(query)
        .sort({ TimeCreated: sortBy[0].desc ? -1 : 1 })
        .skip(Number(req.query.pageIndex) * Number(req.query.pageSize))
        .limit(Number(req.query.pageSize))
        .toArray(),
    ]);

    res.status(200).json({
      events,
      count,
    });
  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  res.status(404).json({ name: 'Bad Request', message: 'Unknown route.' });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
    name: error.name,
  });
});

(async () => {
  const url = process.env.MONGO_CONNECTION_URL;
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db(process.env.DATABASE_NAME);
    eventsCollection = db.collection('events');

    app.listen(expressPort, () =>
      console.log(`events api listening on port ${expressPort}`)
    );
  } catch (error) {
    console.error(error);
  }
})();
