 
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={   //要设置的全局访问的state对象
     heads:0,
     loding:true,
     title:'www.ltcweb.top'
 
   };
//    监听值
const getters = {   //实时监听state值的变化(最新状态)
    heads(state) {  //承载变化的login的值
       return state.heads
    },
    loding(state){
        return state.loding
    },
    title(state){
        return state.title
    }
};
// 改变值
const mutations = {
    heads(state,num) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.heads = num;
    },
    lodings(state,bold){
        state.loding =bold
    },
    titles(state,bold){
        state.title=bold
    }
   
   
};
 

  const store = new Vuex.Store({
       state,
       getters,
       mutations,
    
});
export default store;