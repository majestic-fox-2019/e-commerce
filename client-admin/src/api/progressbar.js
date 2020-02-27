import VueProgressBar from 'vue-progressbar'

const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '10px',
    transition: {
        speed: '0.3s',
        opacity: '0.6s',
        termination: 400
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}

export { VueProgressBar, options }