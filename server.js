const express = require('express')
const next = require('next')

const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log(`Connection to the database successful`))
  .then(() => app.prepare())
  .then(() => {
    const server = express()
    if (!dev) {
      server.set('trust proxy', 1); // trust first proxy
    }
    server.get('*', (req, res) => handle(req, res))

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(err => {
    console.log('err', err);
    process.exit()
  })
