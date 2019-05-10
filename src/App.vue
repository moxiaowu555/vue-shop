<template>
  <div id="app">
    <!-- 头部 -->
    <mt-header fixed title="Vue商城">
			<span slot="left" @click="goBack" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
    <transition>
			<router-view/>
		</transition>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-xw" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-xw" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-xw" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-xw" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	name: 'App',
	data () {
		return {
			flag: false
		}
	},
	created () {
		this.flag = this.$route.path === '/home' ? false : true
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		}
	},
	watch: {
		'$route.path': function(newVal) {
			if(newVal === '/home') {
				this.flag = false
			} else {
				this.flag = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
#app {
  padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;

	.mint-header {
		z-index: 999;
	}
}

.v-enter {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,
.v-leave-active {
	transition: all .5s ease;
}
// 重设tabbar栏样式
.mui-bar-tab .mui-tab-item-xw.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-xw {
	display: table-cell;
	overflow: hidden;
	width: 1%;
	height: 50px;
	text-align: center;
	vertical-align: middle;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: #929292;
}
.mui-bar-tab .mui-tab-item-xw .mui-icon {
	top: 3px;
	width: 24px;
	height: 24px;
	padding-top: 0;
	padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-xw .mui-icon~.mui-tab-label {
	font-size: 11px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
