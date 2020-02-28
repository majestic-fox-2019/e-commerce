import moment from 'moment'

const converter = {
  convert(date) {
   return moment(date).format('D MMM YYYY h:mm:ss a')
  } 
}

export default converter