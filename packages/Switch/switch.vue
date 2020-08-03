<template>
  <div class="fish-switch">
    <input type="checkbox" class="fish-switch-input" v-model="value">
    <i class="fish-switch-ui"></i>
    <span class="fish-switch-label">选择</span>
  </div>
</template>

<script>
export default {
  name: 'FishSwitch',
  props: {
    val: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: false
    }
  },
  model: {
    props: 'val',
    event: 'change'
  },
  watch: {
    val (newVal) {
      this.value = newVal
    },
    value (newVal) {
      this.$emit('change', newVal)
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/mixin.styl'

.fish-switch
  display: flex;
  position: relative;
  align-items: center;
  .fish-switch-input
    position: absolute;
    z-index: 1;
    width: 40px;
    height 30px;
    opacity: 0;
  .fish-switch-label
    font_color(font_color_main);
  .fish-switch-ui
    position: relative;
    display: block;
    width: 40px;
    height: 15px;
    box-sizing: content-box;
    border: 1px solid #e4e4e4;
    border-radius: 9px;
    bg_color(bgColor_003);
  .fish-switch-ui::before
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 9px;
    transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.28);
  .fish-switch-ui::after
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    bg_color(bgColor_001);
    box-shadow: 0 1px 0.8vw rgba(0, 0, 0, 0.4);
    transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.28);
  .fish-switch-input:checked + .fish-switch-ui::before
    transform: scale(0);
  .fish-switch-input:checked + .fish-switch-ui::after
    transform: translateX(15px);
  .fish-switch-input:checked + .fish-switch-ui
    bg_color(bgColor_002);
</style>
