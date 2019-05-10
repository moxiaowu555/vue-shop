<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="valueChangedHandler" />
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
      this.$emit('get-count', parseInt(this.$refs.numbox.value))
    }
  },
  props: ['max'],
  watch: {
    max: function(newVal, oldVal) {
      mui('.mui-numbox')
        .numbox()
        .setOption('max', newVal)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
