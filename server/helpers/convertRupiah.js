function convertRupiah(value) {
  let reverseAngka = value.split('').reverse()
  let count = 0
  let rupiahReverse = ''
  for (let i = 0; i < reverseAngka.length; i++) {
    rupiahReverse += reverseAngka[i]
    count++
    if (count == 3 && i != reverseAngka.length-1) {
      rupiahReverse += '.'
      count = 0
    }
  }
  console.log('Rp. ' + rupiahReverse.split('').reverse().join(''))
  return 'Rp. ' + rupiahReverse.split('').reverse().join('')
}

module.exports = convertRupiah