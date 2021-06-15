const Koa = require ('koa')
const app = new Koa()

const cors = require('koa-cors')

const bodyParser = require('koa-bodyparser')

const serve = require('koa-static'); //static

//const koaBody = require('koa-body')
const router = require('./router')


app.use(serve('.'));

app.use(bodyParser({
    extendTypes: {
        json: ['application/x-javascript']
    }
}))


app.use(router.routes()).use(router.allowedMethods())

app.use(cors(), (ctx, next) => {
    ctx.res.add_header('access-control-allow-origin', '*')
    ctx.res.add_header('access-control-allow-headers', 'origin, x-requested-with, content-type')
    ctx.res.add_header('access-control-allow-methods', 'PUT, GET, POST, DELETE, OPTIONS')
    next()
})

app.use(serve(__dirname + 'uploads/video'));

const PortConfig = require('./config/config.port')


const PORT = PortConfig.PORT
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})
  
  
 