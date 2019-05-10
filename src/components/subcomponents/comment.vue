<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <!-- 发表评论区域 -->
    <textarea placeholder="请输入要BB的内容(最多BB120个字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postCmt">发表评论</mt-button>

    <!-- 评论显示区域 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in list" :key="item.add_time">
        <div class="cmt-title">
          第{{ i + 1}}楼&nbsp;&nbsp;用户名：{{ item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === '' ? '此用户很懒，嘛都没说' : item.content }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>
<script>
import { getComment, postComment } from '../../api/index.js'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      pageIndex: 1,
      msg: '', // 评论内容
      list: [] // 评论数据列表
    }
  },
  created () {
    this.initComment()
  },
  methods: {
    // 初始化评论数据
    initComment () {
      const params = {
        id: this.id,
        pageIndex: this.pageIndex
      }
      getComment(params).then(data => {
        if(data.status === 0) {
          this.list = this.list.concat(data.message)
        }
      })
    },
    // 加载更多
    loadMore () {
      this.pageIndex++
      this.initComment()
    },
    // 发表评论
    postCmt () {
      if(!this.msg.trim()) {
        return Toast('评论内容不能为空')
      }
      const params = {
        id: this.id,
        content: this.msg.trim()
      }
      postComment(params).then(data => {
        if(data.status === 0) {
          const cmt = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.list.unshift(cmt)
          this.msg = ''
        }
      })
    }
  },
  props: ['id']
}
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
