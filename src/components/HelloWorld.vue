<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{copyright}}</h2>
    <h3>{{message}}</h3>
    <button @click='onClick'>test</button>

    <h3>{{watchResult}}</h3>

    <h3>{{computedMsg}}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;

  @Prop({ default: "default value" })
  private copyright!: string;

  message: string = "from data";

  watchResult: string = "";

  get computedMsg() {
    return "the message change to" + this.message;
  }

  @Watch("computedMsg")
  onMsgChange(val: string) {
    this.watchResult = "the watch result change to " + val;
  }

  onClick(): void {
    this.message = "" + Math.random();
  }
}
</script>

 
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
</style>
