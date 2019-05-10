<template>
  <div class="shopcar-container">
    <!-- 购物车商品区域 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in shopList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch @change="selectedChanged(item.id)" v-model="getGoodsSelected[item.id]"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h3 class="title">{{ item.title }}</h3>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initCount="getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="removeGoods(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已勾选商品<span class="red">{{ getSelectedCountAndAmount.count }}</span>件，总价<span class="red">￥{{ getSelectedCountAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from '../subcomponents/shopcar-numbox.vue'
import { mapGetters } from 'vuex'
import { getShopcarList } from '../../api/index.js' 
export default {
  data () {
    return {
      shopList: [] // 购物车列表数据
    }
  },
  created () {
    this.initShopcarList()
  },
  methods: {
    initShopcarList () {
      // 定义空数组，接收购物车的全部商品Id
      let arrId = []
      // 遍历购物车商品，将每个商品id push到数组中
      this.$store.state.car.forEach(item => arrId.push(item.id))
      // 如果购物车没商品，则终止
      if(arrId.length <= 0) {
        return;
      }
      getShopcarList(arrId.join(',')).then(data => {
        if(data.status === 0) {
          this.shopList = data.message
        }
      })
    },
    // 删除购物车商品
    removeGoods (id, index) {
      // 删除页面商品数据
      this.shopList.splice(index, 1)
      // 删除store中购物车商品
      this.$store.commit('removeGoodsFromCar', id)
    },
    // 切换商品选中状态
    selectedChanged (id) {
      this.$store.commit('updateSelected', id)
    }
  },
  computed: {
    // 辅助函数，将store中的getters展开到计算属性中
    ...mapGetters([
      'getGoodsSelected',
      'getGoodsCount',
      'getSelectedCountAndAmount'
    ])
  },
  components: {
    numbox
  }
}
</script>
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;

      img {
        width: 60px;
      }
      h3 {
        font-size: 13px;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .price {
          color: red;
          font-weight: bold;
        }
      }
    }
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
