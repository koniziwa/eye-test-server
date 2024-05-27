import fs from 'fs'

class Sivtsev {
  imageFilenames = fs.readdirSync('./public/images/sivtsevs_charts')
  keys = JSON.parse(fs.readFileSync('./keys/sivtsev_keys.json', 'utf8'))

  getRandomImage(imageList) {
    const randomNumber = Math.floor(Math.random() * imageList.length)
    return imageList[randomNumber]
  }

  getImage(userAnswers) {
    let wasIncorrect = false
    let maxLine = 0
    userAnswers.forEach(({ imageNumber, userAnswer }) => {
      if (this.keys[imageNumber].includes(userAnswer.toLowerCase()))
        maxLine = Number(imageNumber.split('-')[0])
      else {
        wasIncorrect = true
        return
      }
    })

    if (wasIncorrect)
      return {
        status: 'result',
        result: `Ваше зрение составляет ${maxLine * 10}% от нормального`,
      }

    const availableImages = this.imageFilenames.filter(
      filename => filename.split('-')[0] == maxLine + 1
    )
    const nextImage = this.getRandomImage(availableImages)
    return {
      status: 'next',
      result: nextImage,
    }
  }
}

export default new Sivtsev()
