const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const ip = "192.168.56.10"

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/docker/ps', async (req, res) => {
  try {
    const response = await axios.get(`http://${ip}:2375/v1.43/containers/json`);
    res.json(response.data);
  } catch (error) {
    console.log('Failed to fetch Docker container information')
    res.status(500).json({ error: 'Failed to fetch Docker container information' });
  }
});

app.get('/docker/logs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`http://${ip}:2375/v1.43/containers/${id}/logs?stdout=true&stderr=true`,{
		headers: {
        		'Content-Type': 'application/json'
    		}
	});
    res.send(response.data);
  } catch (error) {
    console.log('Failed to fetch Docker container logs')
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch Docker container logs' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://${ip}:${port}`);
});
