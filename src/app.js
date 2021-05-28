const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup directory for serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Pavel Koryakin',
    date: new Date().getFullYear().toString()
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Pavel Koryakin',
    date: new Date().getFullYear().toString()
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Pavel Koryakin',
    helpText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto beatae ducimus error impedit perspiciatis quibusdam vel? A aliquid, dolorum fugiat illo natus obcaecati odit, perspiciatis quibusdam sint sunt suscipit!',
    date: new Date().getFullYear().toString()
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }


  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })
})

  app.get('/products', (req, res) => {
    if (!req.query.search) {
      return res.send({
        error: 'You must provide a search term'
      })
    }

    console.log(req.query.search)
    res.send({
      product: []
    })
  })

  app.get('/help/*', (req, res) => {
    res.render('404', {
      name: 'Pavel Koryakin',
      date: new Date().getFullYear().toString(),
      title: '404',
      errorMessage: 'Unfortunately, article not found'
    })
  })

  app.get('*', (req, res) => {
    res.render('404', {
      name: 'Pavel Koryakin',
      date: new Date().getFullYear().toString(),
      title: '404',
      errorMessage: 'Unfortunately, page not found'
    })
  })


  app.listen(3000, () => {
    console.log('Server is up on port 3000...')
  })
