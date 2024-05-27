export default () => {
  const RU_MONTHS_DICTIONARY = [
    'января',
    'декабря',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const date = new Date()

  const day = date.getDay()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${day} ${RU_MONTHS_DICTIONARY[month]} ${year} г.`
}
