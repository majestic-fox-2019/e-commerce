import Vue from 'vue'

import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Notify, QEditor } from 'quasar'

Vue.use(Quasar, {
  config: {
    Notify
  },
  components: {
    QEditor
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {
    Notify
  }
})
