const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const axios = require("axios");

require("dotenv").config();

const publicPath = path.join(__dirname, "..", "public");
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.get("/country/:countryId/category/:categoryId", async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${req.params.countryId}&category=${req.params.categoryId}&apiKey=${process.env.REACT_APP_API_KEY}`);

    res.send(response.data.articles);
  } catch (error) {
    return console.log(error);
  }
});

app.use(express.static(path.join(__dirname, './client/public')))

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, './client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`news_index react/express/node project running @ port ${port}!`);
});