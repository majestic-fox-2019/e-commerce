const convertidr = {
  convert(num) {
    let str = String(num)
    let converted = ''
    for(let i = 0; i < str.length; i++){
        if((str.length-i) % 3 ==0 && i !== 0){
            converted += '.' + str[i]
        }else {
            converted += str[i]
        }
    }
    return `Rp. ${converted}`
  },
}

module.exports = convertidr