
import {  Row, Col, Loading,Pagination} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Loading)
    Vue.use(Pagination)


  }
}
export default element
