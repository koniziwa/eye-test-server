import Router from 'express'
import TestController from '../controllers/TestController.js'

const testRouter = new Router()

testRouter.post('/color-perception', TestController.testColorPerception)

testRouter.post('/visual-acuity', TestController.testVisualAcuity)

export default testRouter
