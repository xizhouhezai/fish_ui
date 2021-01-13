import FishPage from './page'

FishPage.install = (Vue) => {
  console.log('1111111111111111111')
  Vue.component(FishPage.name, FishPage)
}

export default FishPage
