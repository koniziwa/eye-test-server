import Router from 'express'
import TestController from '../controllers/TestController.js'

const testRouter = new Router()

testRouter.post('/rabkin', TestController.testRabkin)

export default testRouter
