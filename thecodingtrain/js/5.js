const express = require('express')
const path = require('path')
const Datastore = require('nedb')

const app = express()
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
app.use(express.json({ limit: '1mb' }))
app.use(express.static('./'))

const database = new Datastore('database.db')
database.loadDatabase()

app.get('/api', (req, res) => {
	database.find({}, (err, data) => {
		if (err) {
			res.end()
			return
		}
		res.json(data)
	})
})

app.post('/api', (req, res) => {
	const data = req.body
	data.timestamp = Date.now()
	database.insert(data)
	res.json(data)
})
