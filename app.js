const express = require('express');
const app = express();
const axios = require('axios');

const port = 3000;
const apiKey = '0d6b5b11f5bb4afd95c120705240107';


app.get('/api/hello', async (req, res) => {

    const visitor_name = req.query.visitor_name || 'visitor';
    const clientIp = req.ip;
    const city = 'lagos';
    const geoUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    axios.get(geoUrl).then((response) => {
        const data = response.data;
        const location = data.location.name;
        const temperature = data.current.temp_c;
        const result = {
            "client ip": clientIp,
            "location": location,
            "greeting": `hello ${visitor_name}!, the temperature is ${temperature} degree celcius in ${location}`
        };
        res.json(result)

    }).catch((err) => {
        console.log(err);
    });


});


app.listen(port, console.log(`server is listening on port:${port}`));