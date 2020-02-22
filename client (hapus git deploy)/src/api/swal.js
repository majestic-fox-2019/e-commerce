import Swal from 'sweetalert2'

const swal = {
  success(msg) {
    Swal.fire({
      toast: true,
      position: 'top',
      text: msg,
      timerProgressBar:true,
      showConfirmButton: false,
      width: 100,
      timer: 700
    })
  },
  error(msg) {
    Swal.fire("Oops!", msg, "warning")
  }
}

export default swal
