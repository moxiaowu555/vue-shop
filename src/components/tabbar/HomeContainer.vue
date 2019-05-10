<template>
  <div class="home">
    <mt-swipe style="height: 200px;" :auto="4000">
      <mt-swipe-item>
        <img src="../../assets/grey.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../assets/luffy.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../assets/nazi.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
              <img src="../../assets/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photos">
              <img src="../../assets/menu2.png" alt="">
              <div class="mui-media-body">唯美图片</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
              <img src="../../assets/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../assets/menu4.png" alt="">
              <div class="mui-media-body">本地生活</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../assets/menu1.png" alt="">
              <div class="mui-media-body">热映电影</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../assets/menu1.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 轮播图数据
      imgList: []
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-swipe {
  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-grid-view {
  background-color: #fff;
  border: none;

  .mui-table-view-cell {
    border: none;

    .mui-media-body {
      font-size: 13px;
    }

    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
