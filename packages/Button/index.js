import FishButton from './button.vue'

FishButton.install = function (Vue) {
  Vue.component(FishButton.name, FishButton)
}

export default FishButton
