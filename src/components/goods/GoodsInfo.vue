<template>
  <div class="goodsinfo">

    <!-- 小球动画 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe style="height: 200px;" :auto="4000">
            <mt-swipe-item v-for="item in list" :key="item.src">
              <img :src="item.src" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsInfo.market_price }}</del> &nbsp;&nbsp; 销售价：<span class="now">￥{{ goodsInfo.sell_price }}</span>
          </p>
          <p>购买数量：<numbox :max="goodsInfo.stock_quantity" @get-count="getSelectedCount"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no}}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <div :class="['desc', {'active': active}]" @click="toggleDesc">商品详情</div>
        <div :class="['comment', {'active': !active}]" @click="toggleComment">商品评论</div>
      </div>
      <div class="goods-desc">
        <component :is="currentComponent" :id="id"></component>
      </div>
    </div>
  </div>
</template>
<script>
import goodsdesc from './goodsdesc.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'
import comment from '../subcomponents/comment.vue'
import { getThumImgById, getGoodsInfoById } from '../../api/index.js'
export default {
  data () {
    return {
      list: [], // 轮播图列表
      goodsInfo: {}, // 商品详情数据
      flag: false, // 小球状态，默认隐藏
      selectedCount: 1, // 保存用户购买的商品数量，默认购买数1
      currentComponent: 'goodsdesc', // 动态渲染的当前组件
      active: true
    }
  },
  created () {
    this.getGoodsImg()
    this.getGoodsInfo()
  },
  methods: {
    // 初始化轮播图
    getGoodsImg () {
      getThumImgById(this.id).then(data => {
        if(data.status === 0) {
          this.list = data.message
        }
      })
    },
    // 获取商品详情
    getGoodsInfo () {
      getGoodsInfoById(this.id).then(data => {
        if(data.status === 0) {
          this.goodsInfo = data.message[0]
        }
      })
    },
    // 加入购物车
    addToCar () {
      this.flag = !this.flag
      // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      // 拼接一个商品对象，保存到store的state中
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsInfo.sell_price,
        selected: true
      }
      this.$store.commit('addToCar', goodsinfo)
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0, 0)'
    },
    enter (el, done) {
      //也可使用offsetHeight 
      // 原因在于取offsetWidth导致浏览器重绘，使后面的style修改前，display确确实实变为了block
      el.offsetWidth
      // 小球在页面中位置
      const ballPosition = el.getBoundingClientRect()
      // 徽标在页面中位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect()
      // 计算动画的移动距离
      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top
      
      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = 'all .5s cubic-bezier(.3,.16,.38,.94)'
      done()
    },
    afterEnter (el) {
      this.flag = !this.flag
    },
    // 获取子组件传递的值
    getSelectedCount (count) {
      this.selectedCount = count
    },
    // 切换子组件为desc
    toggleDesc () {
      this.active = !this.active
      this.currentComponent = 'goodsdesc'
    },
    // 切换子组件为 comment
    toggleComment () {
      this.active = !this.active
      this.currentComponent = 'comment'
    }
  },
  components: {
    numbox,
    goodsdesc,
    comment
  },
  props: ['id']
}
</script>
<style lang="scss" scoped>
.goodsinfo {
  background-color: #eee;
  overflow: hidden;
  .mui-card {
    .mint-swipe {
      text-align: center;
      img {
        height: 100%;
      }
    }

    .price {
      .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }

  .mui-card-footer {
    text-align: center;
    .desc {
      flex: 1;
      border-right: 1px solid #ccc;
    }
    .comment {
      flex: 1;
    }
    .active {
      color: #226aff;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 407px;
    left: 148px;
  }
}
</style>
