<template>
  <div class="newsinfo-container">
    <!-- 头部标题区域 -->
    <h3 class="info-title">{{ newsInfo.title }}</h3>
    <p class="info-subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{newsInfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="info-content" v-html="newsInfo.content"></div>

    <!-- 评论子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>
<script>
import comment from '../subcomponents/comment'
import { getNewsInfo } from '../../api/index.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      newsInfo: {} // 新闻详情数据
    }
  },
  created () {
    this.initInfo()
  },
  methods: {
    initInfo () {
      getNewsInfo(this.id).then(data => {
        if(data.status === 0) {
          this.newsInfo = data.message[0]
        }
      })
    }
  },
  components: {
    'comment-box': comment
  }
}
</script>
<style lang="scss" scoped>
.newsinfo-container {
  .info-title {
    text-align: center;
    font-size: 16px;
    margin: 15px 0;
  }
  .info-subtitle {
    color: #226aff;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 0 5px;
  }
}
</style>
