<template>
  <div>
    <header>
      <el-row>
        <el-col :xs="12" :sm="4" :md="6" :lg="6" :xl="6" class="rights">
          <div class="arrow-left hidden-md-and-up" @click="silde">
            <img src="@/assets/img/arrow-left.png"/>
          </div>
          <a class="header-left" href="/">My-blog</a>
        </el-col>
        <el-col :xs="12" :sm="20" :md="18" :lg="18" :xl="18" class="right-deail">
          <div class="deail hidden-sm-and-down">
             <span 
             v-for="(item,index) in head" 
             :key='index' 
             @click="path(item.path,index)"
             :class="nav==index?'spanactive':''">
            <i class="iconfont iconhead" :class="item.icon"></i>{{item.name}}</span>
          </div>
          <div class="ipt" @click="ipts()">
            <input type="text" id="ipts" ref="iptfs" @keyup.enter='focus' @blur="focus" @focus="jujiao" v-model="find" placeholder="搜索文章与作者"  />
            <div class="ipt-box" v-if="box"  @touchmove.prevent @mousewheel.prevent>
                <ul>
                  <li v-for="(item,index) in tips" :key="index" @click="findpath(item.arctile_id)">
                      <span>{{item.title}}</span>
                      <span><i class="iconfont icon-iconfontyonghu"></i>{{item.author}}</span>
                  </li>       
                </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </header>
    <div class="slidebar-mask" :class="slid?'show':''"  @click="silde" @touchmove.prevent @mousewheel.prevent></div>
    <div class="nav-slidebar" :class="slid?'anmin':'anmin1'" @touchmove.prevent @mousewheel.prevent>
      <div class="nav-max">
        <span 
             class="nav-item"
             v-for="(item,index) in head" 
             :key='index' 
             @click="path(item.path,index)"
             :class="nav==index?'spanactive':''">
            <i class="iconfont iconhead" :class="item.icon"></i>{{item.name}}</span>
      </div>
      <div class="titles">{{titles}}</div>      
    </div>
   <slot></slot>
    
    <div class="fixed" v-show="btnFlag"  @click="backTop" :style="'bottom:'+tops+'px'"><i class="iconfont icon-huojian"></i></div>
    <!-- <footer>
        版权所有©2018 www.ltcweb.top
    </footer> -->
  </div>
</template>

<script>
import { findsa } from '@/axios/api'
import "@/utils/font/iconfont.css";
import { setTimeout } from 'timers';
export default {
  name: "headers",
  data() {
    return {
      find: "",
      slid: false,
      activeName: '0', 
      nav:0,
      box:false,
      head:[
        {name:'主页',path:'/',icon:'icon-shouyeweixuanquzhuangtai'}, 
        {name:'文章',path:'/article',icon:'icon-ziyuan'},
        {name:'标签',path:'/tag',icon:'icon-biaoqian'},
        {name:'时间轴',path:'/timeline',icon:'icon-shijianzhou'},
        {name:'关于',path:'/about',icon:'icon-guanyu'}
      ],
      btnFlag:false,
      tops:null,
      tips:[],
      titles:this.$store.getters.title
    }
  },
    watch:{
      find:{
        handler:function(val,oldval){
          if(val!=''){
            this.box=true
            this.findajax()
          }else{
            this.box=false
          }
        },
        deep:true
      },
      $route(to,from){
        if(to){
          this.box=false
        }
      }
    },
  methods: {
   
    // 搜索跳转
    findpath(id){   
      this.$router.push({name:'articledetail',params:{id:id}})
    
    },
    // 模态框
    silde() {
      this.slid = !this.slid;
    },
    // find
    ipts() {
      this.$refs.iptfs.style.width = "10rem";
    },
    // find聚焦
    jujiao(){
      if(this.find!=''){
       this.findajax()
       this.box=true
      }
      
    },
    // find失焦
    focus() {
      let finds = this.find;
      if (finds.length == 0) {
        this.$refs.iptfs.style.width = "0rem";
        this.find = "";         
      } else {
       
          // this.box=false
 
         }
      },
       // findajax
    findajax(){
          findsa(this.find).then((res)=>{
              if(res){
                if(res.data.length==0){
                  return
                }else{
                this.tips=res.data

                }
              }
            })
    },
    // 路由
    path(paths,idx){   
      this.$router.push({path:paths})
      this.nav = idx 
      this.slid = false; 

    },
    // 返回顶部
     backTop() {
        let that = this
        clearInterval(timer)
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 10)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          that.tops+=Math.abs(ispeed)
          if(that.scrollTop === 0) {
              clearInterval(timer)
              that.tops=96
              that.btnFlag = false    
          }
        }, 20)
      },
       scrollToTop() {
                let that = this
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                that.scrollTop=scrollTop
                this.box=false
                if(scrollTop >250) {
                    that.btnFlag = true
                } else if(scrollTop===0){
                  that.btnFlag = false
                  
                }
                
            }
   },
       mounted() {
            window.addEventListener('scroll', this.scrollToTop)
            this.nav = this.$store.state.heads || 0
            
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollToTop)
           
        },
        
   
};

</script>


<style scoped>
.titles{
  color: #232321;
    transition: color .15s ease;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.625rem 1.5rem .35rem 1.25rem;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    border-left: .25rem solid transparent;
   
}
footer{
    width: 100%;
    padding: 0.7rem 0px;
    border-top: 1px solid #eaecef;
    text-align: center;
    color: #5c5c57;
    height: 1.875rem;
    line-height: 1.875rem;
    background: #fff;
    z-index: 80;
        position: fixed;
    bottom: 0;
 
}
.fixed{
    position: fixed;
    right: 1rem;
    bottom: 8rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    line-height: 2.5rem;
    background-color: rgba(231, 234, 241, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; 
    z-index: 70;
 
}

.fixed>i{
  color: #424242;
  font-size: 1.6rem;
}
.iconhead{
  margin-right: 0.625rem;
}
 .el-collapse-item__header{
  border: none;
}
.el-collapse{
  border: none;
}
.silde {
  width: 16.4rem;
  
}
header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 3.6rem;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  box-shadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0px;
  z-index: 100;
}
.right-deail {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.rights {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.ipt {
  cursor: pointer;
  position: relative;
}
.ipt-box{
  position: absolute;
  width: 20rem;
  /* height: 50px; */
  top: 2.8125rem;
  background: #ffffff;
  border:1px solid  rgb(207, 212, 219);
  border-radius: 10px; 
    right: 2%;
   

}
.ipt-box>ul{
  padding-left: 0.75rem;
}
.ipt-box>ul>li{
  list-style: none;
  width: 100% ;
 
}
.ipt-box>ul>li>p{
  margin: 0;
  font-size: 0.875rem;
    width: 100%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.ipt-box>ul>li>span{
  display: inline-block;
  height: auto;
  font-size: 0.875rem;
   width: 30%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.ipt-box>ul>li>span:nth-child(1){
 width: 50% !important;

}
.ipt-box>ul>li>span:nth-child(2){
 width: 40% !important;
  margin-left: 10px;

}
#ipts {
  cursor: text;
  width: 10rem;
  height: 2rem;
  color: rgb(92, 92, 87);
  display: inline-block;
  font-size: 0.9rem;
  line-height: 2rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(207, 212, 219);
  border-image: initial;
  border-radius: 2rem;
  padding: 0px 0.5rem 0px 2rem;
  outline: none;
  background: url(../assets/img/find.png) 0.6rem 0.5rem / 1rem no-repeat rgb(255, 255, 255);
  transition: all .3s ease;
}
.deail > span {
  display: inline-block;
  margin-left: 1.625rem;
  cursor: pointer;
  font-weight: bold;
 
}
.deail > span:hover{
   color: rgb(52, 152, 219);
}

.arrow-left {
  width: 1.5625rem;
  height: 1.5625rem;
  margin-right: 0.625rem;
  cursor: pointer;
}
.arrow-left > img {
  width: 100%;
}
/* 侧边栏 */
.slidebar-mask {
  z-index: 81;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom:0; 
  padding-top:3.6rem;
}
.show {
  display: block;
}
.hiden {
  display: none;
}
.nav-slidebar {
  width: 16.4rem;
  height: 100%;
  z-index: 90;
  background: #fff;
  position: fixed;
  top: 3.6rem;
  left: 0;
  transform: translateX(-100%);
   -webkit-transform: translateX(-100%);

  
}
.nav-max{
  border-bottom: 1px solid #eaecef;
padding: .5rem 0 .75rem;
}
.nav-max>span{
  margin-bottom: 0.625rem;
}

.nav-item {
  display: block;
  line-height: 1.25rem;
  font-size: 1.1em;
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #000;
  cursor: pointer;
  font-weight: bold;
}
.spanactives{
    color:  rgb(52, 152, 219);
  
}
.spanactive{
    color: rgb(52, 152, 219);

}
.anmin {
  transform: translateX(0);
  transition: transform 0.2s ease;
   -webkit-transform: translateX(0);
     -webkit-transition: transform 0.2s ease;
}
.anmin1 {
   transform: translateX(0);
  transition: transform 0.2s ease;
   -webkit-transform: translateX(-100%);
   -webkit-transition: transform 0.2s ease;
}
@media (max-width: 768px) {
  #ipts {
    width: 0rem;
  }
  header {
    padding: 0.7rem 0.5rem;
  }
  .ipt-box{
    right: 5%;
  }
  
}
@media (min-width: 992px) {
  #ipts {
    width: 10rem !important ;
  }

  .nav-slidebar {
    transform: translateX(-100%)  ;
  }
 
  .anmin {
  transform: translateX(-100%);
  }
}
</style>
