<template>
  <div class="article article-wrapper" >
    <div class="top-tag">
      <ul>
        <li
          class="tagli"
          v-for="(item,index) in tag"
          :key="index"
          @click="actives(index,item.class_id)"
          :class="special==index?'active':''"
        >
          <span>{{item.class_name}}</span>
          <span class="spans">{{item.class_num}}</span>
        </li>
      </ul>
    </div>
    <lists :list="list"  v-loading="loading"></lists>
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
import lists from "@/components/list";
import headers from "@/components/headers";
import { media,list} from "@/axios/api";
export default {
  components: {
    lists,
    headers
  },
  data() {
    return {
      tag: null,
      special: 0,
      list: [],
      count:0,
      loading:true,
      params:{ page: 1, limit: 10, category:'class',class:1}
    };
  },
  watch:{
    
    
  },
  methods: {
    
    actives(idx,id) {
      this.special = idx;
     this.params.class=id
      this.default()
    },
    // 分页器
      page(val){
        console.log(val)
        this.params.page=val
        this.$router.push({path:'/article',params:{page:val}})
        console.log(this.$route)
        this.default()
    },
    // 分类标签列表
    medias(){
       media('class').then((res)=>{
         if(res.code==1){
           this.tag=res.data
         }
       })
    },
    default(){
      list('?category='+this.params.category+'&class='+this.params.class+'&page='+ this.params.page+'&limit='+this.params.limit)
      .then((res)=>{
        if(res){
          this.loading=false
          this.list=res.data
          this.count=res.count
        }
      })
    }
  
  },
  created() {
     this.default();
    this.medias();
  },

};
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
ul,li {
  padding: 0;
  margin: 0;
}
.article {
  max-width: 740px;
  margin: 0 auto;
  padding: 5rem 2.5rem 5rem;
  transition: all 0.5s;
  transform: translateY(0);
      transition-delay: .08s;
    opacity: 1;
}
.top-tag {
  margin: 1rem 0;
}
.tagli {
  display: inline-block;
  vertical-align: middle;
  margin: 4px 8px 10px;
  padding: 8px 14px;
  display: inline-block;
  cursor: pointer;
  border-radius: 2px;
  font-size: 13px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  color: #000;
}
.tagli:hover {
  color: #fff;
  background: #424242;
}
.spans {
  display: inline-block;
  margin-left: 4px;
  width: 1.2rem;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  border-radius: 50%;
  background: #eee;
  font-size: 0.4rem;
  color: #232321;
}
.active {
  color: #fff;
  background: #424242;
}
@media (max-width: 768px) {
  .article {
    padding: 4.6rem 0.8rem 2rem;
  }
 /deep/ .pages>.el-pagination>.el-pagination__jump{
    display: flex !important;
    justify-content: center !important;
    margin-top: 20px !important;
  }
}
</style>