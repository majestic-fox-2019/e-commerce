import moment from "moment";

function currencyConverter(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

function qtyConverter(num) {
    if (num <= 1) {
        return num + " pc";
    } else {
        return num + " pcs";
    }
}

function dateFormat(date) {
    return moment(date).format("LLL");
}

export { currencyConverter, qtyConverter, dateFormat }