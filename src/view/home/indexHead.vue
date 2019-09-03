<template>
    <div>
        <div class="heads hidden-sm-and-down" >
                <p>明天会再见</p>
                <p>不想平庸，就去改变。</p>
        </div>
        <div class="mobliehead hidden-md-and-up" v-for="(item,index) in mob" :key="index">
            <div class="mobliey" >
                <img :src="item.user_head" alt="">
            </div>
            <h3>{{item.user_name}}</h3>
        </div>
    </div>
</template>
<script>
import { clearInterval, setTimeout, clearTimeout } from 'timers';
// import { setInterval, setTimeout } from 'timers';
export default {
    data() {
      return {
          str:'',
          list:[]
      }
    }, 
    props:['mob'],
    methods:{
      
    },
    mounted(){
       
    }
}
</script>
<style scoped>
.heads{
    width: 100%;
    /* margin-top: 3.6rem; */
   height:450px;
   text-align:center;
   overflow:hidden;
   background:url(../../assets/img/banner.jpg) center/cover no-repeat;
}
.heads>p{
    color: #ffffff;
}
.heads>p:first-child{
    margin-top: 10%;
    font-size: 2.5rem;
    margin-bottom: 1.8rem;
}
.heads>p:last-child{
    font-size: 1.6rem;
}
.mobliehead{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    margin-top: 2.6rem;
    background: rgba(red, green, blue, alpha)
}
.mobliey{
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: 1px solid #eaecef;
    overflow: hidden;
    background: blue;
}
.mobliey>img{
    width: 100%;
    height: 100%;
}

</style>
