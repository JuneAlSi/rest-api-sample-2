const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const genres = [{
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Horror'
  },
  {
    id: 3,
    name: 'Romance'
  }
]

// home page
app.get('/', (req, res) => {
  res.send('Welcome to Genres API. Choose a genre you like.')
})

// Getting multiple genres
app.get('/api/genres', (req, res) => {
  res.send(genres)
})

// Getting single genres
app.get('/api/genres/:id', (req, res) => {
  // Find a genre
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  // error handle
  if (!genre) return res.status(404).send('The genre was not found.');
  // success
  res.send(genre);
})

// Add a genre
app.post('/api/genres/', (req, res) => {
  // validate input and error handle
  const {
    error
  } = validateGenre(req.body)
  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  // add input into existing array
  genres.push(genre);
  // show the new input
  res.send(genre);
})


// Change an existng genre
app.put('/api/genres/:id', (req, res) => {
  // Find the genre that want to be changed
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre was not found.')

  // input validate
  const {
    error
  } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // change
  genre.name = req.body.name;
  // show
  res.send(genre);
})

// Delete an existing genre
app.delete('/api/genres/:id', (req, res) => {
  // Find 
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre was not found')

  // delete
  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  // show the genre deleted
  res.send(genre);
})

// input validate
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(4).required()
  };
  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`))