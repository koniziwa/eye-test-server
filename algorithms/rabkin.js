import fs from 'fs'

class Rabkin {
  protanopiaNumbers = [
    3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 30,
    31, 33, 34, 35, 36, 37, 38, 39, 40, 44, 47,
  ]

  getKeys(path) {
    const keys = fs.readFileSync(path, 'utf8')
    return JSON.parse(keys)
  }

  getRandomImage(imageList, usedImages) {
    const availableImages = imageList.filter(
      imageNumber => !usedImages.includes(imageNumber)
    )
    const randomNumber = Math.floor(Math.random() * availableImages.length) + 1
    return availableImages[randomNumber]
  }

  getImage(userAnswers) {
    let normalCounter = 0
    let dichromiaCounter = 0
    let protanopiaCounter = 0

    const usedImages = []

    const protanopiaKeys = this.getKeys('./keys/protanopia_keys.json')
    const normalKeys = this.getKeys('./keys/normal_keys.json')

    userAnswers.forEach(({ imageNumber, userAnswer }) => {
      usedImages.push(imageNumber)

      if (normalKeys[`${imageNumber}.jpg`].includes(userAnswer)) {
        normalCounter += 1
        return
      }

      if (!this.protanopiaNumbers.includes(imageNumber)) {
        dichromiaCounter += 1
        return
      }

      if (protanopiaKeys[`${imageNumber}.jpg`].includes(imageNumber)) {
        protanopiaCounter += 1
      } else {
        dichromiaCounter += 1
      }
    })

    if (normalCounter >= 10)
      return {
        status: 'result',
        result: 'Пользователь здоров',
        recommendation: 'Побольше спать',
      }

    if (dichromiaCounter >= 3)
      return {
        status: 'result',
        result: 'Подозрение на дейтеранопию',
        recommendation: 'Побольше спать',
      }

    if (protanopiaCounter >= 3)
      return {
        status: 'result',
        result: 'Подозрение на протанопию',
        recommendation: 'Поболше спать',
      }

    return {
      status: 'next',
      result: this.getRandomImage(
        Array.from({ length: 48 }, (_, i) => i + 1),
        usedImages
      ),
    }
  }
}

export default new Rabkin()
