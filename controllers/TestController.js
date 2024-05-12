import Rabkin from '../algorithms/rabkin.js'

import User from '../models/User.js'

class TestController {
  async testRabkin(req, res) {
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
              date: '30-09-2004',
              result: data.result,
              recommendation: 'Спать',
            },
          ],
        }
      )
    }
    return res.json(JSON.stringify(data))
  }
}

export default new TestController()
