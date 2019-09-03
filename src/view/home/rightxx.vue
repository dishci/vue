<template>
    <div class="info hidden-sm-and-down" >
        <div v-for="(item,index) in users" :key='index'>
        <div class="info_top">
            <div class="info-img">
                    <img :src="item.user_head" alt="">
            </div>
            <h3>{{item.user_name}}</h3>
            <div class="info-bot">
                <div class="info-item item1">
                    <h3>{{item.article_num}}</h3>
                    <h6>文章</h6>
                </div>
                <div class="info-item">
                    <h3>{{item.tag_num}}</h3>
                    <h6>标签</h6>
                </div>
            </div>
        </div>
        <div class="bq">
            <h4><i class="iconfont icon-biaoqian"></i>标签</h4>
            <div class="bq-deail">
                <span v-for="(items,index) in tag" :key='index' :style="'background-color:'+items.color" >{{items.tag_name}}</span>
            </div>
        </div>
 </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // indextag:[
            //      {'id':0,tags:'all',num:10,color:this.changecolor()},
            //     {'id':0,tags:'生活日记',num:5,color:this.changecolor()},
            //     {'id':0,tags:'DB',num:2,color:this.changecolor()},
            //      {'id':0,tags:'sql',num:10,color:this.changecolor()},
            //     {'id':0,tags:'mysql',num:5,color:this.changecolor()},
            //     {'id':0,tags:'node',num:2,color:this.changecolor()}
            // ]
        }
    },
    props:["users",'tag']
}
</script>
<style scoped>
.bq-deail>span{
    display: inline-block;
        vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    display: inline-flex;
    cursor: pointer;
    border-radius: 2px;
    background: rgb(131, 130, 130);
    color: #fff;
    font-size: 13px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
    transition: all .5s;
}
.bq-deail>span:hover{
    transform: scale(1.3);

}
.info-bot{
    display: flex;
    align-items: center;
    width: 100%;
}
.info-item{
    width: 50%; 
    text-align: center; 
}
.info-item>h3,.info-item>h6{
    margin-top: 0px;
    margin-bottom: 0px;
}
.info-item>h6{
    margin-top: 10px;
}
.item1{
    border-right: 1px solid #333;
}
.info{
    transition: all .3s;
    width: 263px;
    height: auto;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    box-sizing: border-box;
    padding: 0 15px 10px 15px;
    color: #232321;
     margin-left: 15px;
}

.info_top{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2rem ;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #eaecef;
}
.info-img{
    width: 8rem;
    height: 8rem;
    overflow: hidden;
    background: blue;
    border-radius: 50%;
}
.info-img>img{
    width: 100%;
    height: 100%;
}
.bq>h4>i{
    margin-right: 10px;
}
</style>