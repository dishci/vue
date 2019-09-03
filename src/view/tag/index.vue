<template>
 
        <div class=" article ">
            <div class="top-tag">
                <ul> 
                    <li class="tagli" 
                    v-for="(item,index) in tag" 
                    :style="'background-color:'+item.color" 
                    :key='index' 
                    @click="actives(index,item.tagid)" 
                    :class="special==index?'active':''">
                            {{item.tag_name}}
                    </li>
                </ul>
               
            </div>
             <lists :list='list'  v-loading="loading"></lists>
             <div class="block pages" v-if="this.list.length>=10">
                <el-pagination
                  @current-change="page"
                  :page-size="params.limit"
                  layout="prev, pager, next, jumper"
                  :total="count">
                </el-pagination>
             </div>
        </div>
 
  
</template>
<script>
import {media,list} from '@/axios/api'

import lists from '@/components/list'
import headers from '@/components/headers'
export default {
    components:{
        lists,
        headers,
      
    },
    data(){
        return {
            tag:null,
            special:0,
            one:false,
            count:10,
            list:[],
            loading:true,
            params:{ page: 1, limit: 10, category:'tag',tagid:1},

        }
    },
    methods:{
      page(val){
        this.params.page=val
        this.taglists()
    },
        // 点击调用
        actives(idx,id){
            this.special = idx  
            this.params.tagid=id
            this.taglists()
        },
        // 标签数组
        tags () {
              media('tag').then((res)=>{
                for(var i=0;i<res.data.length;i++){
                res.data[i].color=this.changecolor()
                }
                this.tag = res.data
                this.params.tagid = res.data[0].tagid
                this.taglists()
            })
        },
        // 标签列表
        taglists (){
            list('?category='+this.params.category+'&tagid='+this.params.tagid+'&page='+ this.params.page+'&limit='+this.params.limit)
            .then((res)=>{
                if(res){
                    this.loading=false
                    this.list=res.data
                    this.count= res.count     
                }
                
             })
        }
         
    
    },
    created (){
        this.tags()
        this.taglists()
    }
  
}
</script>
<style scoped>
.block{
      width: 100%;
      display: flex;
      justify-content: center;
       border-radius: 2px;
    /* box-shadow: 0 2px 10px rgba(0,0,0,.2); */
      transition: all .3s;
      margin-top: 3.125rem;
}
ul,li{
    padding: 0;
    margin: 0;
}
.article{
    max-width: 740px;
    margin: 0 auto;
    padding: 5rem 2.5rem 5rem;
}
.top-tag{
    margin: 1rem 0;
}
.tagli{
  vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    background: #fff;
    color: #fff;
    font-size: 13px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
    transition: all .5s;
    background: rgb(131, 130, 130);
 
}
.tagli:hover{
    transform: scale(1.3);

}
.spans{
    display: inline-block;
    margin-left: 4px;
    width: 1.2rem;
    height: 1.2rem;
    text-align: center;
    line-height: 1.2rem;
    border-radius: 50%;
    background: #eee;
    font-size: .4rem;
    color: #232321;
}
.active{
          transform: scale(1.3);
}
@media (max-width: 768px){
   .article{
   
       padding: 4.6rem 1rem 5rem;
   } 
   /deep/ .pages>.el-pagination>.el-pagination__jump{
    display: flex !important;
    justify-content: center !important;
    margin-top: 20px !important;
  }
}
</style>