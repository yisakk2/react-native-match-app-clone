export const calcTimeLeft = createdAt => {
  const now = new Date()
  const past = createdAt.toDate()
  const TimeLeft = past - now + (1000 * 3600 * 24)
  if (TimeLeft < 0) return 'remove'
  const hh = parseInt(TimeLeft / 1000 / 3600) 
  const mm = parseInt(TimeLeft / 1000 / 60 - hh * 60)
  if (hh < 10 && mm < 10) {
    return `0${hh}:0${mm}` 
  } else if (hh < 10) {
    return `0${hh}:${mm}`
  } else if (mm < 10) {
    return `${hh}:0${mm}`
  } else return `${hh}:${mm}`
}

export const calcAgeGroup = age => {
  if (age >= 20 && age < 30) {
    if (age >= 20 && age < 23) return '20대 초반'
    else if (age >= 23 && age < 27) return '20대 중반'
    else return '20대 후반'
  } else if (age >= 30 && age < 40) {
    if (age >= 30 && age < 33) return '30대 초반'
    else if (age >= 33 && age < 37) return '30대 중반'
    else return '30대 후반'
  }
}