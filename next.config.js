const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  publicRuntimeConfig: { // Will be available on both server and client
    API_URL: 'http://localhost:3000/api'
  }
})
