webpackJsonp([3],{"5AD4":function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=i("c2Ch"),s={components:{lists:function(){return i.e(8).then(i.bind(null,"pjeT"))},headers:function(){return new Promise(function(t){t()}).then(i.bind(null,"wFFv"))}},data:function(){return{tag:null,special:0,one:!1,count:10,list:[],loading:!0,params:{page:1,limit:10,category:"tag",tagid:1}}},methods:{page:function(t){this.params.page=t,this.taglists()},actives:function(t,a){this.special=t,this.params.tagid=a,this.taglists()},tags:function(){var t=this;Object(n.c)("tag").then(function(a){for(var i=0;i<a.data.length;i++)a.data[i].color=t.changecolor();t.tag=a.data,t.params.tagid=a.data[0].tagid,t.taglists()})},taglists:function(){var t=this;Object(n.b)("?category="+this.params.category+"&tagid="+this.params.tagid+"&page="+this.params.page+"&limit="+this.params.limit).then(function(a){a&&(t.loading=!1,t.list=a.data,t.count=a.count)})}},created:function(){this.tags(),this.taglists()}},e={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:" article "},[i("div",{staticClass:"top-tag"},[t.tag?i("ul",t._l(t.tag,function(a,n){return i("li",{key:n,staticClass:"tagli",class:t.special==n?"active":"",style:"background-color:"+a.color,on:{click:function(i){return t.actives(n,a.tagid)}}},[t._v("\n                    "+t._s(a.tag_name)+"\n            ")])}),0):t._e()]),t._v(" "),t.list?i("lists",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{list:t.list}}):t._e(),t._v(" "),this.list.length>=10?i("div",{staticClass:"block pages"},[i("el-pagination",{attrs:{"page-size":t.params.limit,layout:"prev, pager, next, jumper",total:t.count},on:{"current-change":t.page}})],1):t._e()],1)},staticRenderFns:[]};var l=i("VU/8")(s,e,!1,function(t){i("Hu/d")},"data-v-99d4f914",null);a.default=l.exports},"Hu/d":function(t,a){}});