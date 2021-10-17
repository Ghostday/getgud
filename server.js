const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(bodyParser());

app.use(cors());
// app.use((req, res, next)=> {
//   console.log('I run on every request!');
//   console.log(req)
//   next();
// })


app.use('/login', (req, res) => {
  console.log(req.body)
  res.send({
    summonerName: req.body.username,
    token: 'test123',
    region: req.body.region,
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));