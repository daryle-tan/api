const express = require("express")
const request = require("request-promise")

const app = express()
const PORT = process.env.PORT || 5001

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scaraper API.")
})

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key,
      )}&url=https://www.amazon.com/dp/${productId}`,
    )
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key,
      )}&url=https://www.amazon.com/product-reviews/${productId}`,
    )
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key,
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`,
    )
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key,
      )}&url=https://www.amazon.com/s?k=${searchQuery}`,
    )
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
