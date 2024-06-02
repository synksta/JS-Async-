const express = require('express')
const Datastore = require('nedb')
const app = express()
const port = 3000

app.listen(port, () => console.log(`App listening on port ${port}`))
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const database = new Datastore('./public/data/database.db')
database.loadDatabase()

app.post('/api', (req, res) => {
	const data = req.body
	// data.timestamp = Date.now()
	database.insert(data)
	res.json(data)
})

app.get('/api', (req, res) => {
	database.find({}, (err, data) => {
		if (err) {
			res.end()
			return
		}
		res.json(data)
	})
})
