// app.js
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(function (req, res, next) {
  const reqTimeStamp = Date.now()
  let log = ''

  function getFormatTime(timeStampNum) {
    const currentDate = new Date(timeStampNum)
    const year = currentDate.getFullYear()
    const month = '0' + (currentDate.getMonth() + 1)
    const date = '0' + currentDate.getDate()
    const hours = currentDate.getHours()
    const minutes = "0" + currentDate.getMinutes()
    const seconds = "0" + currentDate.getSeconds()

    const formattedTime = `${year}-${month.slice(-2)}-${date.slice(-2)} ${hours}:${minutes.slice(-2)}:${seconds.slice(-2)}`

    return formattedTime
  }
  log = `${getFormatTime(reqTimeStamp)} | ${req.method} from ${req.originalUrl}`

  console.log(log)
  fs.appendFile('./logs/request.txt', log + '\n', err => {
    if (err) console.error(err)
  })

  res.on('close', () => {
    const resTimeStamp = Date.now()
    const timePass = resTimeStamp - reqTimeStamp

    log = `${getFormatTime(resTimeStamp)} | ${req.method} from ${req.originalUrl} | total time: ${timePass} ms`
    console.log(log)

    fs.appendFile('./logs/request.txt', log + '\n', err => {
      if (err) console.error(err)
    })
  })
  next()
})

app.get('/', (req, res, next) => {
  res.send(`
    <a href="/new">GET /new</a><br/>
    <a href="/something">GET /something</a><br/>
    <form action="/" method="POST">
      <button type="submit">POST /</button>
    </form>
    `
  )
  next()
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