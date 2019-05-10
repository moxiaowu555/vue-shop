import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const car = JSON.parse(localStorage.getItem('car') || '[]')
const state = {
  car: car // 购物车商品数据
}

const mutations = {
  // 添加商品到购物车
  addToCar (state, goodsinfo) {
    // 假设购物车没有该商品
    let flag = false
    // 如果商品已存在，则更新商品数量
    state.car.some(item => {
      if(item.id === goodsinfo.id) {
        item.count += parseInt(goodsinfo.count)
        flag = true
        return true
      }
    })
    // 如果没有该商品，则新增商品对象进购物车
    if(!flag) {
      state.car.push(goodsinfo)
    }
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  // 更新购物车商品数量
  updateCount (state, goodsinfo) {
    state.car.some(item => {
      if(item.id === goodsinfo.id) {
        item.count = parseInt(goodsinfo.count)
        return true
      }
    })
    // 本地化数据
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  // 根据id删除state中car的商品
  removeGoodsFromCar (state, id) {
    state.car.some((item, i, arr) => {
      if(item.id === id) {
        arr.splice(i, 1)
        return true
      }
    })
    // 本地化数据
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  // 根据id 切换购物车商品的选中状态
  updateSelected (state, id) {
    state.car.some(item => {
      if(item.id === id) {
        item.selected = !item.selected
        return true
      }
    })
    // 本地化数据
    localStorage.setItem('car', JSON.stringify(state.car))
  }
}

const getters = {
  // 购物车商品总数量
  getAllCount (state) {
    let c = 0
    state.car.forEach(item => {
      c += item.count
    })
    return c
  },
  // 过滤 car 返回一个新对象，包含商品 id 和 selected 状态
  getGoodsSelected (state) {
    let obj = {}
    state.car.forEach(item => {
      obj[item.id] = item.selected
    })
    return obj
  },
  // 过滤 car 返回一个新对象，{id: id, count: count}
  getGoodsCount (state) {
    let obj = {}
    state.car.forEach(item => {
      obj[item.id] = item.count
    })
    return obj
  },
  // 获取已选购商品数量
  getSelectedCountAndAmount (state) {
    let obj = {
      count: 0, // 勾选的数量
      amount: 0 // 勾选的总价
    }
    state.car.forEach(item => {
      if(item.selected) {
        obj.count += item.count
        obj.amount += item.price * item.count
      }
    })
    return obj
  }
}


export default new Vuex.Store({
  state,
  mutations,
  getters
})