<template>
  <div class="pagination" :class="theme">
    <span class="total" v-if="isTotalShow">共{{ total }}条</span>
    <button
      title="上一页"
      :disabled="current === 1"
      :class="{ notAllowed: current === 1, allowed: current !== 1 }"
      class="preButton"
      @click="prePage"
    >
      <i class="icon el-icon-arrow-left"></i>
    </button>
    <ul class="pageWrap">
      <a
        v-for="item in pageList"
        :key="item"
        @click.stop="curPage(item)"
      >
        <li class="perPage" :class="{activePage: parseInt(item) === parseInt(current), ellipsis: item === '...'}">
          {{ item }}
        </li>
      </a>
    </ul>
    <button
      title="下一页"
      :disabled="current === Math.ceil(total / pageSize)"
      :class="{ notAllowed: current === Math.ceil(total / pageSize), allowed: current !== Math.ceil(total / pageSize) }"
      class="nextButton"
      @click="nextPage"
    >
      <i class="icon el-icon-arrow-right"></i>
    </button>

    <!-- <el-dropdown v-if="isPageSizeShow" trigger="click" @command="changePageSize">
      <div class="page-size">
        <span>
          {{ pageSize }}条/页
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="i in 4" :key="i" :command="params.pageSize * i">{{ params.pageSize * i }}条/页</el-dropdown-item>  
      </el-dropdown-menu>
    </el-dropdown> -->

    <div class="jump" v-if="isJumpShow">
      <span>跳至</span>
      <input type="number" v-model="value" @keydown.enter="jumpToPage">
      <span>页</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FishPage',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    // pageSize: {
    //   type: Number,
    //   default: 10
    // },
    // 展示每页多少条
    // isPageSizeShow: {
    //   type: Boolean,
    //   default: false
    // },
    // 展示直接跳转到多少页
    isJumpShow: {
      type: Boolean,
      default: false
    },
    // 显示总条数
    isTotalShow: {
      type: Boolean,
      default: false
    },
    // 主题
    theme: {
      type: String,
      default: 'dark' // 'dark', 'light'
    }
  },
  data () {
    return {
      pageList: [],
      jumpPage: this.current,
      params: {
        current: this.current,
        // pageSize: this.pageSize
      },
      value: 1
    }
  },
  watch: {
    'params.current' (newVal) {
      this.value = newVal
      this.updatePage()
    },
    current(newVal) {
      this.params.current = newVal
      this.value = newVal
      this.updatePage()
    },
    // pageSize () {
    //   this.updatePage()
    // },
    total () {
      this.updatePage()
    },
    value (newVal) {
      if (!parseInt(newVal) || parseInt(this.value) < 0) return
      this.updatePage()
    }
  },
  mounted () {
    // element select下拉框渲染位置不在#app元素内，向body添加类，用于覆盖指定样式
    document.body.className = 'custom-' + this.theme
    this.updatePage()
  },
  destroyed() {
    document.body.className = ''
  },
  methods: {
    jumpToPage() {
      console.log(parseInt(this.value))
      if (!parseInt(this.value) || parseInt(this.value) < 0) return
      if (parseInt(this.value) > Math.ceil(this.total / this.pageSize)) {
        this.params.current = Math.ceil(this.total / this.pageSize)
        this.$emit('onChange', this.params.current)
        return
      }
      this.params.current = parseInt(this.value)
      // 暴露输入数字直接跳转的页面事件，供外部调用，更新数据
      this.$emit('onChange', parseInt(this.value))
    },
    // changePageSize(pageSize) {
    //   this.$emit('changePageSize', pageSize)
    // },
    updatePage () {
      this.params.totalPage = Math.ceil(this.total / this.pageSize)
      this.params.defaultTotalPage = this.params.defaultTotalPage ? this.params.defaultTotalPage : 8
      this.jumpPage = this.params.current
      if (this.jumpPage > this.params.totalPage) {
        this.jumpPage = this.params.totalPage
        this.curPage(1)
      }
      this.pageList = []
      if (this.params.totalPage <= this.params.defaultTotalPage) {
        for (let i = 1; i <= this.params.totalPage; i++) {
          this.pageList.push(i)
        }
      } else {
        const offset = Math.ceil(this.params.defaultTotalPage / 2)
        if (this.params.current < offset) {
          for (let i = 1; i <= offset; i++) {
            this.pageList.push(i)
          }
          this.pageList.push('...')
          this.pageList.push(this.params.totalPage)
        } else if (this.params.current > this.params.totalPage - offset) {
          this.pageList.push(1)
          this.pageList.push('...')
          for (let i = offset - 1; i >= 0; i--) {
            this.pageList.push(this.params.totalPage - i)
          }
        } else {
          this.pageList.push(1)
          this.pageList.push('...')
          for (let i = Math.ceil(offset / 2); i > 1; i--) {
            this.pageList.push(this.params.current - i + 1)
          }
          this.pageList.push(this.params.current)
          for (let i = 1; i <= offset / 2; i++) {
            this.pageList.push(parseInt(this.params.current) + i)
          }
          this.pageList.push('...')
          this.pageList.push(this.params.totalPage)
        }
      }
    },
    prePage () {
      if (this.current > 1) {
        this.params.current = this.current - 1
        this.value = this.current - 1
        this.$emit('onChange', this.params.current)
      }
    },
    nextPage () {
      this.params.totalPage = Math.ceil(this.total / this.pageSize)
      if (this.current < this.params.totalPage) {
        this.params.current = parseInt(this.current) + 1
        this.value = parseInt(this.current) + 1
        this.$emit('onChange', this.params.current)
      }
    },
    curPage (item) {
      if (item !== '...') {
        this.params.current = item
        this.value = item
        this.$emit('onChange', this.params.current)
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1A5C7A;
}
.pageWrap {
  display: inline-block;
  vertical-align: bottom;
  list-style-type: none;
  padding: 0;
  margin:0;
}
.perPage, .changeSize, .preButton, .nextButton {
  height: 36px;
  line-height: 36px;
  border: 1px solid #1A6288;
  /* border-radius: 4px; */
  vertical-align: middle;
  margin-right: 10px;
  outline: none;
  color: #1A5C7A;
}
.preButton, .nextButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  outline: none;
  background-color: transparent;
  border-color: #1A6288;
  cursor: pointer;
  box-sizing: content-box;
}
.preButton .icon, .nextButton .icon {
  color: #1A5C7A;
}
.perPage {
  float: left;
  display: inline-block;
  width: 36px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.nextButton {
  margin-right: 14px;
}
.perPage:hover, .preButton:hover, .nextButton:hover{
  color: #00F6FF;
}
.preButton.allowed:hover i, .nextButton.allowed:hover i {
  color: #00F6FF;
}
.activePage {
  color: #00F6FF;
  border: 1px solid #00F6FF;
}
button.notAllowed {
  color: #c0c4cc;
  cursor: not-allowed;
}
.icon {
  font-size: 18px;
}
.ellipsis {
  border: none;
}

.total {
  margin-right: 10px;
  font-size: 14px;
  color: #1A5C7A;
}

.page-size {
  width: 90px;
  height: 36px;
  /* margin-left: 10px; */
  border: 1px solid #1A6288;
  color: #1A5C7A;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

.jump {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 23px;
  font-size: 14px;
}
.jump input {
  width: 36px;
  height: 36px;
  margin: 0 8px;
  outline: none;
  border: 1px solid #1A6288;
  background-color: transparent;
  color: #1A5C7A;
  font-size: 14px;
  text-align: center;
}
</style>

<style lang="stylus">
.el-dropdown-menu {
  background-color: transparent;
  border-radius: 0;
  border: 1px solid #1A6288;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent;
  color: #00F6FF;
}

// 覆盖下拉框样式，会受到其他组件light主题影响，所以主题一样，不建议在同一页面使用不同主题
.custom-light {
  .el-dropdown-menu {
    background-color: #F4F7F9 !important;
    box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.13) !important;
    border: none;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background: #E9EFF4;
    color: #072138;
  }
  .el-dropdown-menu .popper__arrow {
    border-bottom-color: transparent !important;
  }
}

.pagination.light {
  color: #999999;

  .perPage, .changeSize, .preButton, .nextButton {
    box-sizing: border-box;
    border: 1px solid #BAC9D3;
    color: #999999;
  }
  .preButton .icon, .nextButton .icon {
    color: #999999;
  }
  .perPage:hover {
    background-color: #7AA4BE;
    color: #F4F7F9;
    border: none;
  }
  .preButton.allowed:hover i, .nextButton.allowed:hover i {
    color: #999999;
  }
  .activePage {
    background-color: #7AA4BE;
    color: #F4F7F9;
    border: none;
  }
  button.notAllowed {
    color: #c0c4cc;
    cursor: not-allowed;
  }

  .ellipsis {
    border: none;
    background-color: transparent;
  }
  .ellipsis:hover {
    background-color: transparent;
    color: #999999;
  }

  .total {
    color: #999999;
  }

  .page-size {
    border: 1px solid #BAC9D3;
    color: #999999;
  }

  .jump input {
    border: 1px solid #BAC9D3;
    color: #999999;
  }
}
</style>
