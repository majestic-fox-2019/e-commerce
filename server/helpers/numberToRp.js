"use strict"

function changePrice(num) {
    return "Rp." + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = changePrice