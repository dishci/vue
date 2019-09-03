<template>
<div class="linewraper">
    <div class="tops">
        <h2>Time Line</h2>
    </div>
    <div class="linebig">
        <ul class="lines" v-for="(item,index) in list" :key="index">
            <li class="lines1">Yesterday Once More!</li>
            <li class="lines1">
                <h3>{{item.year}}</h3>
            </li>
            <li class="lines1 lines2" v-for="(items,index) in item.data" :key="index">
                <span>{{items}}</span>
            </li>
        </ul>
    </div>
  
</div>
</template>
<script>
import {time} from '@/axios/api'
export default {
    data(){
        return{
            list:null
        }
    },
    methods:{
        times(){
            time(1).then((res)=>{
               if(res.code==1){
                   this.list=res.data
               }
            })
        }
    },
    created(){
        this.times()
    }
}
</script>
<style scoped>
.linewraper{
        max-width: 740px;
    margin: 0 auto;
    padding-top:6rem;
    padding-bottom: 5rem;
}
.tops{
        padding: 2rem 2.5rem;
      
}
.tops>h2{
        padding-bottom: 0.625rem;
      border-bottom:1px solid #eaecef;
}
.linebig{
    padding: 0 2.5rem;
}
.lines{
    box-sizing: border-box;
    max-width: 740px;
    margin: 0 auto;
    position: relative;
    list-style: none;
    padding-inline-start: 19px;
}
.lines>li>h3{
    margin: 5rem 0 0;
    color: #555;
    font-weight: 700;
    font-size: 26px;
}
.lines:after{
 content: " ";
    position: absolute;
    top: 14px;
    left: 0;
    margin-left: -2px;
    width: 4px;
    height: 100%;
    background: #f5f5f5;
}
.lines1{
        position: relative;
    color: #666;
    font-size: 16px;
}
.lines1:before{
       content: " ";
    position: absolute;
    z-index: 2;
    left: -19px;
    top: 50%;
    margin-left: -4px;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    background: #ddd;
    border-radius: 50%;
}
.lines2{
    padding-bottom: 10px;
    margin-top: 15px;
    border-bottom: 1px dashed #ccc;
}
</style>