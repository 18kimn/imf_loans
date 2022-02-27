function shuffle(array: Array<any>) {
  let currentIndex = array.length
  let randomIndex: number
  const arrayCopy = [...array]

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1 // semicolon is actually needed here

    // And swap it with the current element.
    ;[arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ]
  }

  return arrayCopy
}

export default shuffle
