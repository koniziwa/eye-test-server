import Rabkin from '../algorithms/rabkin.js'

class TestController {
  testRabkin(req, res) {
    try {
      console.log(req.body)
      const data = Rabkin.getImage(req.body)
      return res.json(data)
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: e })
    }
  }
}

export default new TestController()
