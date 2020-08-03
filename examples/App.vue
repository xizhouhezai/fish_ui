<template>
  <div id="app">
    <p v-for="(item, index) in list" :key="index">{{item.name}}</p>
    <fish-button :text="'测试按钮'" @click="addListItem"></fish-button>
    <fish-switch v-model="value"></fish-switch>
    <button @click="chengTheme('bright')">浅色</button>
    <button @click="chengTheme('dark')">深色</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      list: [],
      value: false
    };
  },
  methods: {
    addListItem () {
      let oldList = JSON.parse(JSON.stringify(this.list));
      this.list.push({
        name: 'test_' + (oldList.length+1)
      });
    },
    chengTheme (theme) {
      window.document.documentElement.setAttribute('data-theme', theme);
    }
  },
  watch: {
    value () {
      console.log(this.value)
    }
  }
}
</script>

<style lang="stylus">
@import './assets/styles/mixin.styl';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
