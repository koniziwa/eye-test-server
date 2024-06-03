import Router from 'express'
import multer from 'multer'

import User from '../models/User.js'

const profileRouter = new Router()

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './public/images/avatars')
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}.jpg`)
  },
})

const upload = multer({ storage })

profileRouter.post('/upload_avatar', upload.array('photo', 1), (req, res) => {
  res.status(200).json({
    message: 'Успешно сохранена фотография',
  })
})

profileRouter.post(
  '/upload_background',
  upload.array('photo', 1),
  (req, res) => {
    res.status(200).json({
      message: 'Успешно сохранена фотография',
    })
  }
)

profileRouter.post('/update', async (req, res) => {
  const { username, name, surname, city, age } = req.body
  await User.updateOne(
    { username },
    {
      name,
      surname,
      city,
      age,
    }
  )
  return res.status(200).json({ message: 'Успешно обновлена информация' })
})

export default profileRouter
