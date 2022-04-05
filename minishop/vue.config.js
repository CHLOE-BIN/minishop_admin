const express = require('express')
const app = express()
var appData = require('./public/districts.json')
var apiRoutes = express.Router();
app.use('/api', apiRoutes)

module.exports = {
    devServer: {
        before(app) {
            app.get('/api/districts', (req, res) => {
                res.json({
                    data: appData
                })
            })
        },
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}