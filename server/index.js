const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const next = require('next')
const mongoose = require('mongoose');
const apiRoutes = require('./routes');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const frontRequestHandler = app.getRequestHandler()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log(`Connection to the database successful`))
  .then(() => app.prepare())
  .then(() => {
    const server = express()
    server.enable('trust proxy');
    server.use(bodyParser.json({ type: '*/*' }));
    server.use(cookieParser())

    server.get('/signin', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/');
      }
      else {
        return app.render(req, res, '/signin', req.query);
      }
    });

    server.get('/signup', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/');
      }
      else {
        return app.render(req, res, '/signup', req.query);
      }
    });

    server.use('api', apiRoutes)

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
