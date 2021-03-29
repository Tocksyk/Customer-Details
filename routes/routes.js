var express = require('express')
var restControls = require('../public/controllers/RESTControls/RESTControls')
const { validateSchema } = require('../public/controllers/RESTControls/validation')
var router = express.Router()



router.post('/update',validateSchema,restControls.updateData)

router.post('/add',validateSchema,restControls.addData)

router.post('/delete',restControls.deleteData)

router.get('/get',restControls.getData)

module.exports = router