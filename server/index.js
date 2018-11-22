const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const next = require('next')
const mongoose = require('mongoose');
const apiRoutes = require('./routes');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const frontRequestHandler = app.getRequestHandler()

const DATABASE_URL = 'mongodb://main-nov-18:jfQ7lRvuVmPvhxQMpavcIg30GUVFRQuGvDGM@ds113134.mlab.com:13134/trivia'

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log(`Connection to the database successful`))
  .then(() => app.prepare())
  .then(() => {
    const server = express()
    server.set('trust proxy', 1);
    server.use(bodyParser.json({ type: '*/*' }));
    server.use(cookieParser())

    server.use('/api', apiRoutes)

    server.get('*', frontRequestHandler)

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(err => {
    console.log('err', err);
    process.exit(1)
  })
