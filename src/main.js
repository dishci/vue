// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入element ui
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css'
import element from './utils/element'
// 移入font图标
import './utils/font/iconfont.css'



Vue.config.productionTip = false

Vue.prototype.changecolor=()=>{
      let color=['rgb(103, 204, 134);','rgb(251, 155, 95);','rgb(52, 152, 219);','rgb(242, 109, 109);','rgb(131, 130, 130);']
      let idx=Math.ceil(Math.random()*color.length)
      return color[idx]
}
Vue.prototype.$times = (time =+ new Date()) => {
   var time=Number(time)
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');

}

// 挂载el
Vue.use(element)



// 导航
router.beforeEach((to,from,next)=>{
  store.commit('heads',to.meta.bs)
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
