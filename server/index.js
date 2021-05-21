const consola = require('consola')
const express = require('express')
const app = express()
const { Nuxt, Builder } = require('nuxt')
const server = require('http').createServer(app)


const get = require('./get.js')
const post = require('./post.js')
const put = require('./put.js')
app.use(put);
app.use(post);
app.use(get);
app.use('/Whoknowsheknows', express.static("uploads"))
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    const nuxt = new Nuxt(config)
    const { host, port } = nuxt.options.server

    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    app.use(nuxt.render)

    server.listen(port, () => {
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
        })
    })

}
start()
