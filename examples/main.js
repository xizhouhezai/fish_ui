import Vue from 'vue'
import App from './App.vue'

import { FishButton } from '../packages/index'

Vue.config.productionTip = false

Vue.use(FishButton)

new Vue({
  render: h => h(App),
}).$mount('#app')
