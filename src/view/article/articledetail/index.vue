<template>
  <div class="content" ref="box">
    <div class="deail" v-for="(item,index) in listdeail" :key="index">
      <div class="titles">
        <h1>{{item.title}}</h1>
        <hr />
        <div class="deail-icon">
          <span>
            <i class="iconfont icon-iconfontyonghu"></i>
            {{item.author}}
          </span>
          <span>
            <i class="iconfont icon-shijianzhou"></i>
            {{$times(item.time)}}
          </span>
          <span>
            <i class="iconfont icon-liulancishu"></i>
            {{item.ciicks}}
          </span>
          <span v-if="item.tags!=null">
            <i class="iconfont icon-biaoqian"></i>
            {{item.tags}}
          </span>
        </div>
      </div>
      <div class="details" v-html="item.content">{{item.content}}</div>
    </div>
    <div class="deail">
      <div style="border-top: 2px solid #eaecef;padding-top:1rem;margin-top:2rem;">
        <!-- <div id="vcomments" ref="vcomments"></div> -->
        <div id="container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { media } from "@/axios/api.js";
import { nextTick } from "q";

export default {
  name: "Valine",
  data() {
    return {
      listdeail: null
    };
  },
  watch: {
    // $toute(to,from){
    //    console.log(to)
    //    console.log(from)
    // }
    $route: {
      handler: function(to, from) {
        if (to) {
          this.articledea();
          // this.valine();
        }
      },
      deep: true
    }
  },
  methods: {
    valine() {
      let route = this.$route.path;
      const Valine = require("valine");
      new Valine({
        el: "#vcomments",
        appId: "R0KMU7SCyG6NyOX6YrA4sUM5-MdYXbMMI", //  appId
        appKey: "s2h2Rc8ft29TSDpcB62suOlO", //  appKey
        notify: true,
        verify: false,
        path: route,
        visitor: true,
        placeholder: "快来评论吧~",
        avatar: "retro"
      });
    },
    articledea() {
      media("deail&ids=" + this.$route.params.id).then(res => {
        if (res) {
          this.listdeail = res.data;
          this.$store.commit("titles", res.data[0].title);
          console.log(this.$store.getters.title);
        }
      });
    },
    github() {
       let route = this.$route.path;
      var gitment = new Gitment({
        id: route, // 可选。默认为 location.href
        owner: "lvtc",
        repo: "存储评论的 repo",
        oauth: {
          client_id: "8fbef2280b8588327542",
          client_secret: "f03c52821ef353f0cab28524fd707d5746cf5e30"
        }
      });
      gitment.render("container");
    }
  },

  created() {
    this.articledea();
  },
  mounted() {
    // this.valine();
    this.github()
  }
};
</script>
<style scoped>
.deail {
  max-width: 740px;
  margin: 0 auto;
  padding: 2rem 1.875rem;
}
hr {
  border: 0;
  border-top: 1px solid #eaecef;
}
.deail-icon {
  padding-top: 0.5rem;

  clear: both;
}
.deail-icon > span {
  font-size: 0.9rem;
  color: #999999;
  margin-right: 2rem;
}
.deail-icon > span > i {
  margin-right: 0.3125rem;
}
.details {
  margin-top: 1.5rem;
  line-height: 1.7;
  letter-spacing: 1px;
  text-indent: 1.5625rem;
}
.vwrap {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-top: 4rem;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  padding: 10px;
}
.vheader > input {
  display: inline-block;
  width: 33.33%;
  border-bottom: 1px dashed #dedede;
  border: none;
}
#vcomments {
  max-width: 740px;
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 768px) {
  .deail-icon > span {
    display: block;
    margin-bottom: 0.625rem;
  }
  .deail {
    max-width: 740px;
    margin: 0 auto;
    padding: 1.25rem 0.9375rem;
  }
}
</style>