<template>
  <div id="app">
       <headers >
          <router-view></router-view>
      </headers>
  </div>
</template>

<script>
import headers from '@/components/headers'
export default {
  name: 'App',
  components:{
    headers
  }
}
</script>

<style>
body,html{
  min-width: 320px;

 
}
body{
  margin: 0;
  padding: 0;
  font-size: 16px;
}
a{
  text-decoration: none;
}
.content{
  padding-top: 3.6rem;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding-bottom: 3.125rem;
   
}
.hiden{
  overflow: hidden;
}
::-webkit-scrollbar {
	width:5px;
	height:5px;
}
::-webkit-scrollbar-track-piece {
	background-color:rgba(0,0,0,.2);
	-webkit-border-radius:6px;
}
::-webkit-scrollbar-thumb:vertical {
	height:5px;
	background-color:hsla(0,0%,49%,.7);
	-webkit-border-radius:6px
}
::-webkit-scrollbar-thumb:horizontal {
	width:5px;
	background-color:hsla(0,0%,49%,.7);
	-webkit-border-radius:6px
}
</style>
