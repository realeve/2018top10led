<template>
  <div id="app">
    <DashBoard />
    <!-- <HelloWorld msg="msg 1" copyright="copyright 1"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DashBoard from "./components/DashBoard.vue";

@Component({
  components: {
    DashBoard
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
html {
  color: #fff;
  width: 100%;
  height: 100%;
  background: #000;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
