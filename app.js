// app.js
const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
  const timeStamp = Date.now()

  const currentDate = new Date(timeStamp)
  const year = currentDate.getFullYear()
  const month = '0'+ (currentDate.getMonth() + 1)
  const date = '0' + currentDate.getDate()
  const hours = currentDate.getHours()
  const minutes = "0" + currentDate.getMinutes()
  const seconds = "0" + currentDate.getSeconds()

  const formattedTime =`${year}-${month.slice(-2)}-${date.slice(-2)} ${hours}:${minutes.slice(-2)}:${seconds.slice(-2)}`
  
  console.log(`${formattedTime} | ${req.method} from ${req.originalUrl}`)
  next()
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})