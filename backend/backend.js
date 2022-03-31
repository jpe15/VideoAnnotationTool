const express = require('express')
const app = express()
const port = 3000

// Serve frontend by default.
app.use(express.static('../frontend'))

app.listen(port, () => {
	console.log(`Backend listening on port ${port}`)
})
