<template>
<div  v-if="list" >
    <div class="abstract-item" @click="path(item.arctile_id,item.ciicks)" v-for="(item,index) in list" :key='index'>
            <div class="abstract-title" :title="item.title"><span>{{item.title}}</span></div>
            <div class="abstract-deail" v-if="item.contentjj!=''">
                <div class="deail-title">{{item.title}}</div>
                <div class="deail-dea">{{item.contentjj}}</div>
            </div>
            <div class="deail-icon">
                <span><i class="iconfont icon-iconfontyonghu"></i>{{item.author}}</span>
                <span><i class="iconfont icon-shijianzhou"></i>{{$times(item.time)}}</span>
                <span v-if="item.tags!=null"><i class="iconfont icon-biaoqian"></i>{{item.tags}}</span>
                <span><i class="iconfont icon-liulancishu"></i>{{item.ciicks}}</span>
            </div>
    </div>
    
  </div> 
</template>
<script>
import { whites } from '@/axios/api'
export default {
    methods:{
        path(id,clicks){
            this.$router.push({name:'articledetail',params:{id:id}})
            var data={clicks:clicks+=1,ids:id}
            whites(data).then((res)=>{})
        }
    },
    props:['list']
}
</script>
<style scoped>

.abstract-item{
    margin: 0 auto 20px;
    padding: 16px 20px;
    width: 100%;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    box-sizing: border-box;
    transition: all .3s;
    background: #ffffff;

}
.abstract-item:hover{
    transform: scale(1.01)
}
.abstract-title{
    color:#424242;
    font-size: 1.65rem;
      width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.3125rem;
}
.abstract-title>span{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.deail-title{
    font-size:1.28rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #eaecef;
   cursor: default;
}
.deail-dea{
      line-height: 1.7;
    padding: 1rem 0px;
      border-bottom: 1px solid #eaecef;
        cursor: default;
}
.deail-icon{
    padding-top: 0.625rem;
 
    /* clear: both; */
  
}
  .deail-icon>span{
      font-size: .9rem;
      color: #999999;
      margin-right: 2rem;
  }
  .deail-icon>span>i{
      margin-right: 0.3125rem;
  }
   .abstract-title>span{
       position: relative;
       cursor: default;
   }
  .abstract-title>span::after{
      content: '';
      width: 100%;
      height: 2px;
      background:#424242;
      position: absolute;
      left: 0;
      bottom: -1px;
      visibility: hidden;
    transform: scaleX(0);
    transition: .3s ease-in-out;
  }
  .abstract-title>span:hover:after{
   visibility: visible;
    transform: scaleX(1);
  }
  @media (max-width: 768px){
       .deail-icon>span{
           display: block !important;
           margin-bottom: 0.3125rem;
     
  }
  }
</style>