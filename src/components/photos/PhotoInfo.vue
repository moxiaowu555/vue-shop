<template>
  <div class="photoinfo-container">

    <!-- 标题区域 -->
    <h3 class="title">{{ info.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ info.add_time | dateFormat }}</span>
      <span>点击：{{ info.click }}次</span>
    </p>

    <hr>

    <!-- 略缩图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list"></vue-preview>
    </div>

    <!-- 内容区域 -->
    <div class="content" v-html="info.content"></div>

    <!-- 评论区域 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>
<script>
import { getPhotoInfoById, getThumImgById } from '../../api/index.js'
import comment from '../subcomponents/comment.vue'
export default {
  data () {
    return {
      info: {}, // 图片信息
      list: [] // 略缩图列表
    }
  },
  created () {
    this.initPhotoInfo()
    this.getThumImgs()
  },
  methods: {
    // 初始化图片列表
    initPhotoInfo () {
      getPhotoInfoById(this.id).then(data => {
        if(data.status === 0) {
          this.info = data.message[0]
        }
      })
    },
    // 获取缩略图
    getThumImgs () {
      getThumImgById(this.id).then(data => {
        console.log(data)
        if(data.status === 0) {
          data.message.forEach(item => {
            item.w = 600
            item.h = 400
            item.msrc = item.src
          });
          this.list = data.message
        }
      })
    }
  },
  components: {
    'comment-box': comment
  },
  props: ['id'] // 接收路由传递的参数，使组件和路由解耦
}
</script>
<style lang="scss" scoped>
.photoinfo-container {
  .title {
    font-size: 18px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #226aff;
    padding: 0 2px;
  }
}
</style>
