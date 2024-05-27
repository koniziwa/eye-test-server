import Rabkin from '../algorithms/rabkin.js'
import Sivtsev from '../algorithms/sivtsev.js'

import User from '../models/User.js'

import getCurrentDate from '../utils/getCurrentDate.js'

class TestController {
  async testColorPerception(req, res) {
    const data = Rabkin.getImage(req.body)
    if (data.status == 'result') {
      const { examinations } = await User.findOne({
        username: req.body[0].username,
      })
      await User.updateOne(
        { username: req.body[0].username },
        {
          examinations: [
            ...examinations,
            {
              type: 'Цветоощущение',
              date: getCurrentDate(),
              result: data.result,
              recommendation: data.recommendation,
            },
          ],
        }
      )
    }
    return res.json(JSON.stringify(data))
  }

  async testVisualAcuity(req, res) {
    const data = Sivtsev.getImage(req.body)
    if (data.status == 'result') {
      const { examinations } = await User.findOne({
        username: req.body[0].username,
      })
      await User.updateOne(
        { username: req.body[0].username },
        {
          examinations: [
            ...examinations,
            {
              type: 'Острота зрения',
              date: getCurrentDate(),
              result: data.result,
              recommendation: data.recommendation,
            },
          ],
        }
      )
    }
    return res.json(JSON.stringify(data))
  }
}

export default new TestController()
