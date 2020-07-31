<template>
  <div class="pagination">
    <button class="preButton" @click="prePage" :disabled="current === 1" :class="current === 1 ? 'notAllowed' : ''">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAAAXNSR0IArs4c6QAAAh5JREFUOBGVlM9LG1EQx91V0WatNaQ55Zh7sbRBRBF/0KrJJkVaeiiElh5yi0dPHoLgyaun4CEH8WAENbtrrRpsD4VCSg9e+z/0VKK0+eFn1F1W3STbB5O3+958Zr47816Urv8YqVTqaa1WKyqK8lP1yyUSiWf1er2MfxTTFD9gMpmMNRqNo2azOYT/92AwONsRjMfjIzh/xh5hXzVN04vF4p+2UnVdH8X56AY6BpoXiPeuliDyxpEmmQYxIxqNJoHOBZLhKRV5E1TOAhxg3olEIu/y+fy/a+T69x6IvEkKYbKtAW0GAoEPZKq7IXm+JRVohiyWQNhGLBZ77wUJ6GSkuS/o0z7gAzKtm6a5yNwUJ69xBfJNc2zuYv2qqq4BLXk5u9dUqveShT2ByLDiB5IAPcjbYO4DWrYsa1UW/Qwpjl2x4Vwu1+MHEh+VTB+xc4ryplKpbGcymV4/8FVx+M5pemcABwiyT+/e0oa/7QI47XA3HsDkXL5uBzsHgGp+Ids8JodYr1aru9lstq9VViej7cBBGKPSn5D9kCCH4XB4oVAoXNj79nwPlA25TnzzIY9yM+Q6vUK2czPExxOUDfcFJnOZgnW+VgLKQPZzZB8jewj4lOOoG4ZRlT2nOPJyd5RKpR84z7D+G3iKIAfpdFpuTmup7iDIHibjCXCI9W+hUKjzn5UdANlPyFgGfszaVlupNiQzss+Ypsj8i7n7EnS+0Qej7kcMAAAAAElFTkSuQmCC">
    </button>
    <ul class="pageWrap">
      <li @click="curPage(item)" class="perPage" :class="{activePage: item === current}" v-for="item in pageList" :key="item">{{item}}</li>
    </ul>
    <button class="nextButton" @click="nextPage" :disabled="current === Math.ceil(total / pageSize)" :class="current === Math.ceil(total / pageSize) ? 'notAllowed' : ''">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAAAXNSR0IArs4c6QAAAiFJREFUOBGNlM9LG1EQx7O7qf2xRdO/IZB7LTmUFlq1tobdVYTmUDA0p5yaY68lvXr0KB48CTYUaXYN/qgiQlGh0NJrzjnFFG1NbKGb9DMhG6Ju1h0Y3uzO+7z5vvdmVzEM40O73R6NRqPpUqn0LRLSVObpeNx13R0WeRCSi6ixWOwVkw+peo/xs2VZyTCwIpPS6fTdRqPhED7BT/EX5XL5iHGgidRIsVg803U9RbiNj+Bbpmk+ZBxoHVCywOfxeNwitPFhpG8i+7Hk/KwjtT+Ry+VuVKvVFcCXiqKcMRrI3u+fI/EVUF6yZ63ZbC4DzfHYUFXVdBxnT3Ke9aR6L2REtptMJl8TLuE6C6yz5wnJeeZb0UsCKAALjG+Qfa5p2gxNIgfoL9UDvRF4vtVqveX5Dz7LnjcCK3qgjHTVeyq/I/xL5WmtPxkUVyqVvUQi8Y85z1ngqe/h+C1QKBSiAPe7OTeU1O7drgLOyiEBG9eC3OkQdyqf3gxQkzu1bNveDQQFovk/UsHELzTCwD3m8/mbVFoTSFoPT/V3j2/FbDZ7q1arrSFvCuA3x5/i4r+wSM+ugMi7jbxPzJjEf7GnKSod9IhucAEUCHk2laQvAz/oHsi3d4e2coDGkHeCvEnkfb1cyXvuHE4mk9H5WZUFIvETeRNBkMCKQPV6fZP4EZXqwM9o4u+SDDIVaJEJAh0jbzwMJAuKVA2owjiGvB/yMoz9BwJM8ZrOIl5tAAAAAElFTkSuQmCC">
    </button>
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
      pageSize: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        pageList: [],
        jumpPage: this.current,
        params: {
          current: 1
        },
      }
    },
    mounted () {
      this.updatePage()
    },
    methods:{
      updatePage () {
        this.params.totalPage = Math.ceil(this.total / this.pageSize)
        this.params.defaultTotalPage = this.params.defaultTotalPage ? this.params.defaultTotalPage : 9
        this.jumpPage = this.params.current
        if (this.jumpPage > this.params.totalPage) {
          this.jumpPage = this.params.totalPage
          this.curPage(this.params.totalPage)
        }
        this.pageList = []
        console.log('current====>', this.params.current)
        if (this.params.totalPage <= this.params.defaultTotalPage) {
          for(let i = 1; i <= this.params.totalPage; i++){
            this.pageList.push(i)
          }
        } else {
          let offset = Math.ceil(this.params.defaultTotalPage / 2)
          console.log('offset====>', offset)
          if(this.params.current <= offset){
            for(let i = 1; i <= offset; i++){
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
              this.pageList.push(this.params.current - i)
            }
            this.pageList.push(this.params.current);
            for (let i = 1; i <= offset / 2; i++) {
              this.pageList.push(parseInt(this.params.current) + i)
            }
            this.pageList.push('...');
            this.pageList.push(this.params.totalPage)
          }
        }
      },
      prePage () {
        if (this.current > 1) {
          this.params.current = this.current - 1
        }
      },
      nextPage () {
        this.params.totalPage = Math.ceil(this.total / this.pageSize)
        if (this.current < this.params.totalPage) {
          this.params.current = parseInt(this.current) + 1
        }
      },
      curPage (item) {
        if (item != '...') {
          this.params.current = item
        }
      }
    },
    watch: {
      'params.current' () {
        this.$emit('changePage', this.params.current)
        this.updatePage()
      },
      pageSize () {
        this.$emit('changePage', this.params.current)
        this.updatePage()
      },
      total () {
        this.$emit('changePage', this.params.current)
        this.updatePage()
      }
    }
  }
</script>

<style scoped>
  .pagination {
    color: #666;
  }
  .pageWrap {
    display: inline-block;
    vertical-align: bottom;
    list-style-type: none;
    padding: 0;
    margin:0;
  }
  .perPage, .changeSize, .preButton, .nextButton {
    height: 32px;
    line-height: 32px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    vertical-align: middle;
    margin-right: 5px;
    outline: none;
  }
  .preButton, .nextButton {
    width: 32px;
    height: 32px;
    line-height: 32px;
    outline: none;
    background-color: #fff;
    cursor: pointer;
  }
  .preButton img, .nextButton img {
    width: 7px;
    height: 13px;
  }
  .perPage {
    float: left;
    display: inline-block;
    width: 32px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
  }
  .nextButton {
    margin-right: 14px;
  }
  .perPage:hover, .preButton:hover, .nextButton:hover{
    color: #C53BEC;
  }
  .preButton:hover, .nextButton:hover {
    color: #C53BEC;
  }
  .activePage {
    color: #C53BEC;
    border: 1px solid #C53BEC;
  }
  button.notAllowed {
    color: #c0c4cc;
    cursor: not-allowed;
  }
</style>
