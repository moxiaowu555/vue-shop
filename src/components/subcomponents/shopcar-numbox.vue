<template>
  <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initCount" ref="numbox" @change="valueChangedHandler" readOnly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import * as mui from '../../lib/mui/js/mui.min.js'
export default {
  mounted () {
    mui('.mui-numbox').numbox()
  },
  methods: {
    valueChangedHandler () {
      this.$store.commit({
        type: 'updateCount',
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ['initCount', 'goodsid']
}
</script>
<style lang="scss" scoped>

</style>

