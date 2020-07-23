<template>
  <div id="app">
    <p v-for="(item, index) in list" :key="index">{{item.name}}</p>
    <fish-button :text="'测试按钮'" @click="addListItem"></fish-button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      list: []
    };
  },
  methods: {
    addListItem: function () {
      let oldList = JSON.parse(JSON.stringify(this.list));
      this.list.push({
        name: 'test_' + (oldList.length+1)
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
