import FishButton from "./Button/index"
import FishPage from "./page/index"

const components = [
  FishButton,
  FishPage
]

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  FishButton,
  FishPage
}
