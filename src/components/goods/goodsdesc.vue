<template>
  <div class="dec-container">
    <h3 class="title">
      {{ goodsDesc.title }}
    </h3>
    <hr>
    <div class="content" v-html="goodsDesc.content"></div>
  </div>
</template>

<script>
import { getGoodsDescById } from '../../api/index.js'
export default {
  data () {
    return {
      goodsDesc: {} // 商品图文信息
    }
  },
  created () {
    this.initGoodsDesc()
  },
  methods: {
    // 初始化商品信息
    initGoodsDesc () {
      getGoodsDescById(this.id).then(data => {
        if(data.status === 0) {
          this.goodsDesc = data.message[0]
        } 
      })
    }
  },
  props: ['id']
}
</script>
<style lang="scss">
.dec-container {
  padding: 4px;
  .title {
    margin: 15px 0;
    color: #226aff;
    text-align: center;
    font-size: 16px;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
