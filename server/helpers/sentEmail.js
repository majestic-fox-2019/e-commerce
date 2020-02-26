require('dotenv').config()
const convertRp = require('../helpers/convertRupiah')

function sentEmail(email, date, name, product, price){
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let convertedPrice = convertRp(price)
  let template = `
  <h3 style="color: black;">Terima Kasih atas kepercayaan Anda telah berbelanja di Arduishop.<br>
  Berikut merupakan informasi transaksi yang telah Anda lakukan:<br>
  Tanggal	:	${date}<br>
  Customer: ${name}<hr>
  <table>
  <tr>
    <th>No</th>
    <th>Product</th>
    <th>Amount</th>
  </tr>
  `
  product.forEach((prod, id) => {
    template += `<tr>
    <td style="text-align: center;">${id + 1}</td>
    <td style="text-align: center;">${prod.name}</td>
    <td style="text-align: center;">${prod.amount}</td>
    </tr>
    `
  })  
  template += `
  </table>
  <hr>
  Total Harga  : ${convertedPrice}<br>
  Kami menyarankan Anda untuk menyimpan email ini sebagai referensi dari transaksi Anda. Semoga informasi ini bermanfaat bagi Anda.
  <br>
  <br>
  Hormat kami,
  <br>
  <br>
  Arduishop
  `  
  console.log(template)  
  const msg = {
    to: email,
    from: 'fajrinpgrm@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: template,
  };
  sgMail.send(msg);
}

module.exports = sentEmail
