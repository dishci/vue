<template>
    <div>
        <div class="content">
            <index-head :mob='user1'></index-head>  
            <div class="wrapper">
                <div class="wrapper-list">
                     <lists :list='listarray'></lists>
                </div>
                <div class="wrapper-right">
                    <indexright :users='user1' :tag='tag'></indexright>
                </div>
            </div>
        </div>      
    </div>
</template>
<script>
import {list,media} from '@/axios/api.js'
import indexHead from './indexHead'
import indexright from './rightxx'
import headers from '@/components/headers'
import lists from '@/components/list'
export default {
    components:{
        headers,
        indexHead,
        indexright,
        lists
    },
    data() {
      return {
          listarray:null,
          user1:null,
          tag:null
      }
    }, 
    methods:{
        lists () {
            list('?home=1').then((res)=>{
                this.listarray = res       
            })
        },
        media (){
            media('user').then((res)=>{
                this.user1=res.data
            })
            media('tag').then((res)=>{
                for(var i=0;i<res.data.length;i++){
                res.data[i].color=this.changecolor()
                }
                this.tag = res.data
            })
        }
          
    },
    created (){
  
        this.lists()
        this.media()
   


    }
}
</script>
<style scoped>
.wrapper{
    margin: 20px auto 1.875rem;
    max-width: 1126px;
    display: flex;
    flex-direction: row;
    padding: 0 0.9375rem;
}
.wrapper-list{
    width: 100%
}

</style>
