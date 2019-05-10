<template>
  <div class="photo-container">
    <!-- 分类滑动区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', {'mui-active': item.id ==0}]" data-wid="tab-top-subpage-1.html" v-for="item in cateList" :key="item.id" @tap="getPhotoList(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photos">
      <router-link :to="'/home/photoinfo/' + item.id" class="photo-item" v-for="item in imgList" :key="item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h3 class="title">{{ item.title }}</h3>
          <div class="body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { getCategory, getPhotosById } from '../../api/index.js'
// 引入 mui 的js文件
import * as mui from '../../lib/mui/js/mui.min.js'
// babel-plugin-transform-remove-strict-mode  禁用严格模式插件
export default {
  data () {
    return {
      cateList: [], // 分类数据列表
      imgList: [] // 图片列表
    }
  },
  created () {
    this.initCategory()
    this.getPhotoList(0)
  },
  mounted () {
    // 初始化 scroll 控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    // 初始化分类
    initCategory () {
      getCategory().then(data => {
        if(data.status === 0) {
          // 手动添加一个 全部 分类
          data.message.unshift({title: '全部', id: 0})
          this.cateList = data.message
        }
      })
    },
    // 获取图片列表
    getPhotoList (cateId) {
      getPhotosById(cateId).then(data => {
        if(data.status === 0) {
          this.imgList = data.message
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// chrome为提高页面滑动流畅度新增的样式
* {
  touch-action: pan-y;
}
.photo-container {
  .photos {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;

    .photo-item {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0.4, .4);
      position: relative;

      img {
        width: 100%;
        vertical-align: middle;
      }

      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }

      .info {
        color: #fff;
        position: absolute;
        bottom: 0;
        text-align: left;
        background-color: rgba(0, 0, 0, .4);
        max-height: 84px;

        .title {
          font-size: 14px;
        }
        .body {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
