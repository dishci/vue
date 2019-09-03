import Vue from 'vue'
import Router from 'vue-router'

// resolve=>(require(["@/components/HelloWorld"],resolve))  异步方法
// const One = ()=>import("./one");  组件方法
//  const One =resolve=>(['./one'],resolve) 组件异步方法
const index = () =>import('@/view/home')
const article = () =>import('@/view/article')
const tag = () =>import('@/view/tag')
const timeline = () =>import('@/view/timeline')
const articledetail = ()=>import('@/view/article/articledetail')
const about = () =>import('@/view/about')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: index,
      meta:{
        title:'主页',
        bs:0
      }
    },
    {
      path:'/article',
      name:'article',
      component:article,
      meta:{
         title:'文章列表',
         bs:1
      }
    },
    {
      path:'/tag',
      name:'tag',
      component:tag,
      meta:{
         title:'标签',
         bs:2
      }
    },
    {
      path:'/timeline',
      name:'timeline',
      component:timeline,
      meta:{
         title:'时间轴',
         bs:3
      }
    },
    {
      path:'/articledetail/:id',
      name:'articledetail',
      component: articledetail,
      meta:{
        keeplive:true,
         title:'文章详情',
         bs:1
      }
    },
    {
      path:'/about',
      name:'about',
      component: about,
      meta:{
         title:'关于',
         bs:4
      }
    }
   
   
  ]
})
