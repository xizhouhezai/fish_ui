import Vue from 'vue'
import App from './App.vue'

import { FishButton, FishSwitch } from '../packages/index'

Vue.config.productionTip = false

Vue.use(FishButton)
Vue.use(FishSwitch)

new Vue({
  render: h => h(App),
}).$mount('#app')
