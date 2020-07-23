<template>
  <a class="btn btn-blue" href="javascript:void(0);" @click="fnClick">
    {{text}}
  </a>
</template>

<script>
export default {
  name: 'FishButton',
  props: {
    text: {
      type: String,
      default: function () {
        return '';
      }
    }
  },
  methods: {
    // 按钮点击事件
    fnClick: function () {
      this.$emit('click');
    }
  }
}
</script>

<style lang="stylus" scoped>
  .btn {
    display: inline-block;
    padding: 3px 12px;
    color: #8c8c8c;
    background: #ffffff;
    font-size: 14px;
    border: 1px solid #8c8c8c;
    text-decoration: none;
  }
  .btn.btn-blue {
    border: 1px solid #0079ff;
    color: #0079ff;
  }
  .btn.btn-red {
    border: 1px solid #ff5e5e;
    color: #ff5e5e;
  }
  .btn.btn-green {
    border: 1px solid #35a26c;
    color: #35a26c;
  }
  .btn:active {
    opacity: 0.75;
    text-decoration: none;
  }
</style>
