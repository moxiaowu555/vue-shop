<template>
  <div class="news-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { getNewsList } from '@/api/index.js'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      newsList: [] // 新闻资讯列表
    }
  },
  created () {
    this.initNewsList()
  },
  methods: {
    initNewsList () {
      getNewsList().then(data => {
        if(data.status === 0) {
          this.newsList = data.message
        } else {
          Toast({
            message: '数据加载失败',
            position: 'middle',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mui-table-view {
  h3 {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
