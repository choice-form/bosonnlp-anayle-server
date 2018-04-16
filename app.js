const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const config = require('./config')
const router = require('./routes')

const app = new Koa()

// app.use(async (ctx, next) => {
//   // ctx.set('Access-Control-Allow-Origin', '*')
//   // ctx.set('Access-Control-Allow-Credentials','true')
//   await next()
// })
app.use(cors({
  // origin:'*',
  // credentials:'true'
}))

app.use(logger())
app.use(bodyParser({
  jsonLimit: '50mb',
  formLimit: '50mb'
}))

app.use(router.routes(), router.allowedMethods())

app.use(async ctx => {
  ctx.state = 404
  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html'
      ctx.body = '<p>Page Not Found</p>'
      break
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Page Not Found'
  }
})

module.exports = app

app.listen(config.port, () => {
  console.log(`this server is start at port ${config.port}`)
})