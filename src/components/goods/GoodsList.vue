<template>
  <div class="goods-container">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h3>{{ item.title }}</h3>
      <div class="info">
        <p class="price">
          <span class="new">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { getGoodsList } from '../../api/index.js'
export default {
  data () {
    return {
      pageIndex: 1,
      goodsList: [] // 商品列表
    }
  },
  created () {
    this.initGoodsList()
  },
  methods: {
    // 初始化商品列表
    initGoodsList () {
      getGoodsList(this.pageIndex).then(data => {
        if(data.status === 0) {
          this.goodsList = data.message
        }
      })
    },
    // 编程式路由跳转 商品详情页
    goDetail (id) {
      this.$router.push({ name: 'goodsInfo', params: { id }})
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-container {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 6px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    h3 {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .new {
          color: red;
          font-size: 16px;
          font-weight: bold;
        }
        .old {
          font-size: 12px;
          text-decoration-line: line-through;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
